/**
 * Fills WhatsApp and RNAAT in Site Settings.
 * Run with: npx tsx --env-file=.env src/seed-contact.ts (stop the dev server first)
 */
import { getPayload } from 'payload'
import config from './payload.config'

async function run() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      whatsapp: '+351 918 030 672',
      legal: {
        companyName: 'Douro Wonders, Lda.',
        rnaat: 'RNAAT 88/2002',
        livroReclamacoesUrl: 'https://www.livroreclamacoes.pt',
      },
    },
  })

  payload.logger.info('WhatsApp + RNAAT seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
