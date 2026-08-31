import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Contact form handler.
 *
 * Runs on the server so the ByteForms API key never reaches the browser
 * (the transactional API can send mail to any address — exposing the key
 * would let anyone send email through the account).
 *
 * The message is stored in the CMS first: that is the source of truth, so a
 * mail outage can never lose an enquiry.
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const name = str(body.name)
  const email = str(body.email)
  const phone = str(body.phone)
  const subject = str(body.subject)
  const message = str(body.message)
  const honeypot = str(body._gotcha)

  // Bot filled the hidden field — accept silently and drop it.
  if (honeypot) return NextResponse.json({ ok: true })

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (message.length > 5000 || name.length > 200 || subject.length > 200 || phone.length > 40) {
    return NextResponse.json({ error: 'Too long' }, { status: 400 })
  }

  // 1. Store it — this must succeed for us to report success.
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'contact-messages',
    data: { name, email, phone: phone || undefined, subject: subject || undefined, message, status: 'new' },
  })

  // 2. Notify by email. A failure here is logged, not surfaced: the enquiry is safe.
  let delivered = false
  const apiUrl = process.env.BYTEFORMS_API_URL
  const apiKey = process.env.BYTEFORMS_API_KEY

  if (apiUrl && apiKey) {
    try {
      const settings = await payload.findGlobal({ slug: 'site-settings' })
      const to = settings?.email || 'info@dourowonders.com'
      const heading = subject || 'Nova mensagem do site'

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          subject: `Site — ${heading}`,
          replyTo: email,
          text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || '—'}\nAssunto: ${subject || '—'}\n\n${message}`,
          html: `
            <h2 style="font-family:sans-serif;color:#3f3d38;margin:0 0 16px">${escapeHtml(heading)}</h2>
            <table style="font-family:sans-serif;color:#3f3d38;border-collapse:collapse">
              <tr><td style="padding:4px 12px 4px 0;color:#8a8a85">Nome</td><td>${escapeHtml(name)}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#8a8a85">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              ${phone ? `<tr><td style="padding:4px 12px 4px 0;color:#8a8a85">Telefone</td><td>${escapeHtml(phone)}</td></tr>` : ''}
              ${subject ? `<tr><td style="padding:4px 12px 4px 0;color:#8a8a85">Assunto</td><td>${escapeHtml(subject)}</td></tr>` : ''}
            </table>
            <p style="font-family:sans-serif;color:#3f3d38;white-space:pre-line;margin-top:20px;padding-top:16px;border-top:1px solid #ded3b6">${escapeHtml(message)}</p>
          `,
        }),
        signal: AbortSignal.timeout(15000),
      })
      delivered = res.ok
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        payload.logger.error(`ByteForms ${res.status}: ${JSON.stringify(err)}`)
      }
    } catch (err) {
      payload.logger.error(`ByteForms request failed: ${String(err)}`)
    }
  }

  return NextResponse.json({ ok: true, delivered })
}
