/**
 * Seeds the CMS with the approved content from the
 * Douro Wonders Website/Brand/Booking Master v4.2.
 *
 * Run with: npm run seed
 * Idempotent: skips collections/globals that already have content.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const img = (name: string) => path.resolve(dirname, '../public/images', name)

const BOKUN_CHANNEL_UUID = 'f00495fb-af4b-475e-892e-4fe2da06d9ff'
const BOKUN_DAY_CALENDAR =
  'https://widgets.bokun.io/online-sales/f00495fb-af4b-475e-892e-4fe2da06d9ff/experience-calendar/1249232?partialView=1'

async function run() {
  const payload = await getPayload({ config })

  const upload = async (file: string, alt: string) => {
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: alt } },
      limit: 1,
    })
    if (existing.docs[0]) return existing.docs[0].id
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: img(file),
    })
    return doc.id
  }

  // ---------- Media ----------
  const heroId = await upload('hero.png', 'The Douro at golden hour with the Ribeira and Ponte D. Luís I')
  const bowId = await upload('bow-sunset.png', 'The bow of the boat facing Ponte D. Luís I at sunset')
  const ponteId = await upload('ponte-luis.png', 'Ponte D. Luís I seen from the river')
  const boutiqueId = await upload('pillow-boutique.png', 'Douro Wonders embroidered pillow on deck')
  const ribeiraId = await upload('ribeira-view.png', 'The Ribeira seen from the river through olive leaves')
  const wineId = await upload('wine-deck.png', 'A glass of white wine on the teak deck at sunset')

  // ---------- Experiences ----------
  const experiences = await payload.find({ collection: 'experiences', limit: 1 })
  if (experiences.totalDocs === 0) {
    await payload.create({
      collection: 'experiences',
      data: {
        title: 'Shared Day Cruise',
        slug: 'day-cruise',
        subtitle: 'Porto: Small-Group Douro River Day Cruise',
        duration: '90 minutes',
        schedule: [{ time: '10:30' }, { time: '13:00' }, { time: '15:00' }, { time: '17:00' }],
        shared: {
          referencePrice: 50,
          launchPrice: 40,
          shortCopy:
            'Discover Porto from the Douro on a small-group cruise hosted by locals, with iconic river views, authentic stories, a welcome drink and carefully chosen local flavours on board.',
          ctaLabel: 'Book Day Cruise',
        },
        private: {
          launchPrice: 450,
          subtitle: 'Private Douro Day Cruise',
          shortCopy:
            'Your people, your moment, our river. Book the boat privately for a Douro experience shaped around your group, with drinks, local flavours and the details that make it feel yours.',
          ctaLabel: 'Book Private Day Cruise',
        },
        bokun: { widgetSrc: BOKUN_DAY_CALENDAR },
        image: ribeiraId,
        imagePrivate: bowId,
        order: 1,
      },
    })
    await payload.create({
      collection: 'experiences',
      data: {
        title: 'Shared Sunset Cruise',
        slug: 'sunset-cruise',
        subtitle: 'Porto: Small-Group Douro River Sunset Cruise',
        duration: '2 hours',
        schedule: [{ time: '19:00' }],
        shared: {
          referencePrice: 65,
          launchPrice: 55,
          shortCopy:
            'Experience the Douro at its most beautiful hour, with good company, evening light, selected drinks and local flavours as Porto and Gaia change colour from the river.',
          ctaLabel: 'Book Sunset Cruise',
        },
        private: {
          launchPrice: 630,
          subtitle: 'Private Douro Sunset Cruise',
          shortCopy:
            'A private sunset cruise on the Douro for your group, hosted with local knowledge, good taste, selected drinks, local flavours and the best evening views of Porto and Vila Nova de Gaia.',
          ctaLabel: 'Book Private Sunset Cruise',
        },
        bokun: { widgetSrc: '' }, // sunset calendar link pending from Bókun
        image: wineId,
        imagePrivate: bowId,
        order: 2,
      },
    })
    payload.logger.info('Seeded experiences')
  }

  // ---------- FAQs ----------
  const faqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (faqs.totalDocs === 0) {
    const faqData: Array<[string, string]> = [
      [
        'Where is the meeting point?',
        'Douro Marina | Afurada, Rua da Praia 430, Gate B, 4400-354 Vila Nova de Gaia, Porto, Portugal.',
      ],
      ['How early should I arrive?', 'Please arrive 10 minutes before departure.'],
      [
        'What is included?',
        'Each experience includes a welcome drink, selected drinks, local flavours, skipper and host, blankets, insurance, local recommendations and a few small surprises on board.',
      ],
      ['Is food included?', 'Yes. Food is included as small local flavours or light bites, not as a full meal.'],
      [
        'Are drinks included?',
        'Yes. A welcome drink is included, with Porto Tonic or a non-alcoholic alternative. Selected drinks are also part of the onboard experience.',
      ],
      [
        'What happens if the weather or river conditions are not safe?',
        'If the experience needs to be cancelled for safety, weather, river or operational reasons, guests will be offered a reschedule or refund.',
      ],
      ['Can children join?', 'Yes, children can join when accompanied by an adult.'],
      ['Can I book the boat privately?', 'Yes. You can book a Private Day Cruise or Private Sunset Cruise.'],
      [
        'Can I request extras for a special occasion?',
        'Yes. For special occasions or custom details, speak with us before booking. We’ll tell you what’s possible.',
      ],
      [
        'Are pets allowed?',
        'Pets may be accepted only when safe, legal and operationally appropriate. Please contact us before booking.',
      ],
      ['Is the route always the same?', 'The route may vary depending on river, weather and safety conditions.'],
    ]
    for (let i = 0; i < faqData.length; i++) {
      await payload.create({
        collection: 'faqs',
        data: { question: faqData[i][0], answer: faqData[i][1], order: i + 1 },
      })
    }
    payload.logger.info('Seeded FAQs')
  }

  // ---------- Homepage global ----------
  const home = await payload.findGlobal({ slug: 'homepage' })
  if (!home?.hero?.headline) {
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        hero: {
          headline: 'Authentic Douro Experiences',
          subheadline:
            'Small-group and private Douro River cruises from Porto and Vila Nova de Gaia, hosted by locals who know the river personally.',
          primaryCta: 'Book Now',
          secondaryCta: 'Explore Authentic Experiences',
          mobileStickyCta: 'Check Availability',
          image: heroId,
        },
        campaign: {
          active: true,
          badgeText:
            'Opening offer — special launch prices, with local flavours and a few small surprises on board.',
          offerTitle: 'Opening Offer',
          offerBody:
            'To celebrate the launch, every cruise sails with special launch prices, local flavours and a few small surprises on board.',
        },
        founders: {
          headline: 'Made by two people who know this river personally.',
          body: 'Douro Wonders was created by Inês Veloso and António Ferrer to share the Douro with more care, detail and local knowledge. António brings the maritime experience, navigation and safety. Inês shapes the guest experience, communication, creative direction and the small details that make the moment feel considered.',
          image: bowId,
        },
        included: {
          intro:
            'Each experience includes a welcome drink, selected drinks, local flavours and a few small surprises on board.',
          items: [
            { item: 'Welcome drink: Porto Tonic or non-alcoholic alternative' },
            { item: 'Selected drinks' },
            { item: 'Local flavours or small Portuguese bites' },
            { item: 'Small launch surprises on board' },
            { item: 'Skipper and host' },
            { item: 'Blankets' },
            { item: 'Insurance' },
            { item: 'Local recommendations' },
            { item: 'Small-group atmosphere' },
          ],
        },
        route: {
          stops: [
            { stop: 'Douro Marina / Afurada' },
            { stop: 'Ponte da Arrábida' },
            { stop: 'Massarelos' },
            { stop: 'Alfândega' },
            { stop: 'Ribeira' },
            { stop: 'Ponte D. Luís I' },
            { stop: 'Cais de Gaia' },
            { stop: 'Views of Porto and Vila Nova de Gaia' },
          ],
          note: 'The route may vary depending on river, weather and safety conditions.',
          image: ponteId,
        },
        boutique: {
          headline: 'A small floating boutique',
          body: 'A small floating boutique of things made here, found here and worth carrying home. A curated selection of Portuguese products, local finds, small design objects and things worth carrying home.',
          image: boutiqueId,
        },
      },
    })
    payload.logger.info('Seeded homepage')
  }

  // ---------- Site settings ----------
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (!settings?.email) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        seo: {
          title: 'Douro Wonders | Authentic Douro Experiences',
          description:
            'Premium small-group and private Douro River cruises from Porto and Vila Nova de Gaia, hosted with local knowledge, good taste, selected drinks and local Portuguese flavours.',
        },
        email: 'info@dourowonders.com',
        meetingPoint: {
          name: 'Douro Marina | Afurada',
          addressLines: [
            { line: 'Rua da Praia 430' },
            { line: 'Gate B' },
            { line: '4400-354 Vila Nova de Gaia' },
            { line: 'Porto, Portugal' },
          ],
          arrivalNote: 'Please arrive 10 minutes before departure.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Douro+Marina+Rua+da+Praia+430+Vila+Nova+de+Gaia',
        },
        social: {
          instagram: 'https://www.instagram.com/dourowonders',
          facebook: 'https://www.facebook.com/DouroWonders',
          linkedin: 'https://www.linkedin.com/company/douro-wonders',
          google: 'https://www.google.com/search?q=Douro+Wonders',
        },
        bokun: { bookingChannelUUID: BOKUN_CHANNEL_UUID },
        cancellationPolicy:
          'Free cancellation up to 24 hours before the experience.\n\nLess than 24 hours before departure, late arrivals and no-shows are non-refundable.\n\nIf the experience needs to be cancelled for safety, weather, river or operational reasons, guests will be offered a reschedule or refund.',
        legal: {
          companyName: 'Douro Wonders, Lda.',
          livroReclamacoesUrl: 'https://www.livroreclamacoes.pt',
        },
      },
    })
    payload.logger.info('Seeded site settings')
  }

  payload.logger.info('Seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
