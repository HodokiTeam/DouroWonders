/**
 * Consistency check: does every field the site reads actually exist in the CMS,
 * in every language? Run with: npx tsx --env-file=.env src/seed-check.ts
 */
import { getPayload } from 'payload'
import config from './payload.config'
import { locales } from './i18n/config'

async function run() {
  const payload = await getPayload({ config })
  const problems: string[] = []
  const ok = (label: string, cond: unknown) => {
    if (!cond) problems.push(label)
  }

  for (const locale of locales) {
    const home = await payload.findGlobal({ slug: 'homepage', locale })
    const settings = await payload.findGlobal({ slug: 'site-settings', locale })
    const exps = await payload.find({ collection: 'experiences', sort: 'order', limit: 10, locale })
    const faqs = await payload.find({ collection: 'faqs', limit: 50, locale })
    const posts = await payload.find({ collection: 'posts', limit: 50, locale })

    ok(`[${locale}] hero.headline`, home?.hero?.headline)
    ok(`[${locale}] hero.subheadline`, home?.hero?.subheadline)
    ok(`[${locale}] hero.primaryCta`, home?.hero?.primaryCta)
    ok(`[${locale}] campaign.badgeText`, home?.campaign?.badgeText)
    ok(`[${locale}] experiencesSection.title`, home?.experiencesSection?.title)
    ok(`[${locale}] route.title`, home?.route?.title)
    ok(`[${locale}] boat.headline`, home?.boat?.headline)
    ok(`[${locale}] boat.specs`, home?.boat?.specs?.length)
    ok(`[${locale}] included.items`, home?.included?.items?.length)
    ok(`[${locale}] boutique.headline`, home?.boutique?.headline)
    ok(`[${locale}] founders.ines.bio`, home?.founders?.ines?.bio)
    ok(`[${locale}] founders.antonio.bio`, home?.founders?.antonio?.bio)
    ok(`[${locale}] faqSection.title`, home?.faqSection?.title)

    ok(`[${locale}] seo.title`, settings?.seo?.title)
    ok(`[${locale}] seo.description`, settings?.seo?.description)
    ok(`[${locale}] email`, settings?.email)
    ok(`[${locale}] phones`, settings?.phones?.length)
    ok(`[${locale}] whatsapp`, settings?.whatsapp)
    ok(`[${locale}] meetingPoint.addressLines`, settings?.meetingPoint?.addressLines?.length)
    ok(`[${locale}] bokun.bookingChannelUUID`, settings?.bokun?.bookingChannelUUID)
    ok(`[${locale}] legal.rnaat`, settings?.legal?.rnaat)

    ok(`[${locale}] experiences = 2`, exps.totalDocs === 2)
    for (const e of exps.docs) {
      ok(`[${locale}] ${e.slug}.title`, e.title)
      ok(`[${locale}] ${e.slug}.duration`, e.duration)
      ok(`[${locale}] ${e.slug}.shared.launchPrice`, e.shared?.launchPrice)
      ok(`[${locale}] ${e.slug}.private.launchPrice`, e.private?.launchPrice)
      ok(`[${locale}] ${e.slug}.shared.shortCopy`, e.shared?.shortCopy)
      ok(`[${locale}] ${e.slug}.image`, e.image)
      ok(`[${locale}] ${e.slug}.gallery`, e.gallery?.length)
      ok(`[${locale}] ${e.slug}.details.itinerary`, e.details?.itinerary?.length)
      ok(`[${locale}] ${e.slug}.details.highlights`, e.details?.highlights?.length)
      ok(`[${locale}] ${e.slug}.details.includes`, e.details?.includes?.length)
    }
    ok(`[${locale}] faqs = 11`, faqs.totalDocs === 11)
    ok(`[${locale}] posts = 6`, posts.totalDocs === 6)
    for (const p of posts.docs) {
      ok(`[${locale}] post ${p.slug} content`, p.content)
      ok(`[${locale}] post ${p.slug} cover`, p.coverImage)
    }
  }

  // Route map: the number of itinerary stops must match the coordinate lists
  const day = await payload.find({ collection: 'experiences', where: { slug: { equals: 'day-cruise' } }, limit: 1 })
  const sunset = await payload.find({ collection: 'experiences', where: { slug: { equals: 'sunset-cruise' } }, limit: 1 })
  const dayCount = day.docs[0]?.details?.itinerary?.length ?? 0
  const sunsetCount = sunset.docs[0]?.details?.itinerary?.length ?? 0
  ok(`route map day stops = 23 (got ${dayCount})`, dayCount === 23)
  ok(`route map sunset stops = 29 (got ${sunsetCount})`, sunsetCount === 29)

  // Bókun links
  ok('day-cruise bokun widget', day.docs[0]?.bokun?.widgetSrc)
  const sunsetWidget = sunset.docs[0]?.bokun?.widgetSrc

  if (problems.length) {
    payload.logger.error(`${problems.length} problem(s):`)
    for (const p of problems) payload.logger.error(`  ✗ ${p}`)
  } else {
    payload.logger.info('✓ every field the site reads is present in all 5 languages')
  }
  payload.logger.info(`Bókun sunset widget: ${sunsetWidget ? 'set' : 'STILL EMPTY — awaiting the link'}`)
  process.exit(problems.length ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
