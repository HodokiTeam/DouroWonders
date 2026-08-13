/**
 * Adds/updates the detail-page content (GetYourGuide-style) for the two experiences.
 * Run with: npx tsx --env-file=.env src/seed-details.ts
 * Safe to re-run: it overwrites the `details` group only.
 */
import { getPayload } from 'payload'
import config from './payload.config'

const itinerary = [
  { stop: 'Douro Marina da Afurada — Gate B', note: 'Meet your local host and walk together to the boat' },
  { stop: 'Arrábida Bridge', note: 'Welcome drink, pass by' },
  { stop: 'Massarelos & Alfândega', note: 'Boat cruise, local stories' },
  { stop: 'Ribeira', note: 'Views of Clérigos Tower, Porto Cathedral and the Gaia wine cellars' },
  { stop: 'Dom Luís I Bridge', note: 'Photo stop, scenic views' },
  { stop: 'Maria Pia & São João bridges', note: 'Pass by, view toward Freixo Bridge' },
  { stop: 'Return to Douro Marina', note: 'Fresh views of Porto and local recommendations' },
]

const asItems = (arr: string[]) => arr.map((item) => ({ item }))

const includes = asItems([
  'Shared small-group Douro River cruise',
  'Welcome Porto Tonic',
  'Water or juice as a non-alcoholic alternative',
  'Professional skipper and local host',
  'Fuel',
  'Required insurance and safety equipment',
  'Local stories and recommendations',
  'Discreet lounge and bossa nova background music',
])

const notSuitableFor = asItems(['Wheelchair users'])
const notAllowed = asItems(['Smoking', 'Luggage or large bags'])
const knowBeforeYouGo = asItems([
  'Please arrive 10 minutes before departure.',
  'For safety reasons, the itinerary may be adjusted due to weather or river traffic conditions. If the experience cannot operate, guests may choose to reschedule or receive a full refund.',
])

const dayDescription = `Meet your local host at Gate B of Douro Marina da Afurada and walk together to the boat. Once onboard, settle into the cushioned seating, enjoy a welcome Portuguese aperitif — or water or juice — and begin a small-group cruise along the Douro River.

Pass beneath Arrábida Bridge and continue toward Porto's historic riverfront. Along the way, hear concise local stories about the new bridge under construction, Massarelos Church and the former fishing and fish-market area, the Crystal Palace Gardens, and Porto's old Customs House, where historic mooring rings can still be seen beside the water.

As the boat reaches the heart of the city, take in views of Ribeira, Clérigos Tower, Porto Cathedral, the Gaia waterfront, and the historic wine cellars. Cruise beneath Dom Luís I Bridge and pause for a dedicated photo moment, with the bridge and historic waterfront as the backdrop.

Continue past Infante Bridge, Maria Pia Bridge, and São João Bridge, with a view toward Freixo Bridge, before turning back toward Afurada.

This is a hosted river experience rather than a scripted lecture. Your local hosts share useful historical context, personal recommendations, and stories at a natural pace while leaving plenty of time to relax, talk, take photographs, and simply enjoy the river. Each cruise naturally adapts to the atmosphere on board, creating a welcoming and personal experience.

Soft lounge music complements the atmosphere throughout the cruise, while the changing light over the river creates new perspectives of Porto from the water.

Return to Douro Marina in Afurada with fresh views of Porto, local recommendations for the rest of your stay, and memorable moments shaped by the river and the people you shared them with.`

const sunsetDescription = `Meet your local host at Gate B of Douro Marina da Afurada and walk together to the boat. Once onboard, settle into the cushioned seating, enjoy a welcome Portuguese aperitif — or water or juice — and begin a small-group sunset cruise along the Douro River.

Pass beneath Arrábida Bridge as the evening light warms Porto's historic riverfront. Along the way, hear concise local stories about Massarelos Church, the Crystal Palace Gardens, and Porto's old Customs House, where historic mooring rings can still be seen beside the water.

As the boat reaches the heart of the city, watch Ribeira, Clérigos Tower, Porto Cathedral, the Gaia waterfront and the historic wine cellars change colour with the evening light. Cruise beneath Dom Luís I Bridge and pause for a dedicated photo moment at the most beautiful hour of the day.

Continue past Infante Bridge, Maria Pia Bridge, and São João Bridge, with a view toward Freixo Bridge, before turning back toward Afurada as the sun sets over the river mouth.

This is a hosted river experience rather than a scripted lecture. Your local hosts share useful historical context, personal recommendations, and stories at a natural pace while leaving plenty of time to relax, talk, take photographs, and simply enjoy the evening. Each cruise naturally adapts to the atmosphere on board, creating a welcoming and personal experience.

Soft lounge music complements the atmosphere throughout the cruise, while the golden hour over the river creates the best evening views of Porto and Vila Nova de Gaia.

Return to Douro Marina in Afurada with fresh views of Porto, local recommendations for the rest of your stay, and memorable moments shaped by the river and the people you shared them with.`

async function run() {
  const payload = await getPayload({ config })

  const update = async (slug: string, details: Record<string, unknown>) => {
    const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1 })
    const doc = res.docs[0]
    if (!doc) {
      payload.logger.warn(`Experience not found: ${slug}`)
      return
    }
    await payload.update({ collection: 'experiences', id: doc.id, data: { details } })
    payload.logger.info(`Updated details: ${slug}`)
  }

  await update('day-cruise', {
    languages: 'English, French, Portuguese, Spanish',
    highlights: [
      { text: 'See Porto and Gaia from the Douro on a relaxed small-group cruise' },
      { text: 'Enjoy a welcome Porto Tonic, with water or juice also available' },
      { text: 'Hear local stories and recommendations from warm, experienced hosts' },
      { text: 'Capture memorable photos with Dom Luís I Bridge as your backdrop' },
      { text: 'Small groups of up to 12 guests, hosted by the founders' },
    ],
    fullDescription: dayDescription,
    itinerary,
    includes,
    notSuitableFor,
    notAllowed,
    knowBeforeYouGo,
  })

  await update('sunset-cruise', {
    languages: 'English, French, Portuguese, Spanish',
    highlights: [
      { text: 'Experience the Douro at its most beautiful hour' },
      { text: 'Enjoy a welcome Porto Tonic, with water or juice also available' },
      { text: 'Watch Porto and Gaia change colour from the river at golden hour' },
      { text: 'Capture memorable photos with Dom Luís I Bridge as your backdrop' },
      { text: 'Small groups of up to 12 guests, hosted by the founders' },
    ],
    fullDescription: sunsetDescription,
    itinerary,
    includes,
    notSuitableFor,
    notAllowed,
    knowBeforeYouGo,
  })

  payload.logger.info('Details seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
