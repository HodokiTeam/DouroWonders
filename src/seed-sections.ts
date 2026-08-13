/**
 * Populates the new editable section headings on the Homepage global and
 * builds a photo gallery for each experience from the existing imagery.
 * Run with: npx tsx --env-file=.env src/seed-sections.ts (stop the dev server first)
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const img = (name: string) => path.resolve(dirname, '../public/images', name)

async function run() {
  const payload = await getPayload({ config })

  const upload = async (file: string, alt: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    if (existing.docs[0]) return existing.docs[0].id
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: img(file) })
    return doc.id
  }

  // ---- Section headings ----
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      experiencesSection: {
        title: 'Choose your Douro experience',
        lead: 'Shared cruises for up to 12 guests, or the whole boat privately for your group.',
        sharedLabel: 'Shared Cruises',
        sharedTag: 'Per person · small groups of up to 12 guests',
        privateLabel: 'Private Cruises',
        privateTag: 'Per boat · your people, your moment, our river',
      },
      route: {
        title: 'From the marina to the bridges',
        lead: 'Follow the trajectory — from Afurada to the heart of Porto and back. Tap any stop to explore.',
      },
      included: { title: 'What’s included' },
      faqSection: { title: 'Frequently asked questions' },
    },
  })
  payload.logger.info('Seeded section headings')

  // ---- Experience galleries ----
  const galleryFor: Record<string, Array<{ file: string; alt: string; caption?: string }>> = {
    'day-cruise': [
      { file: 'ribeira-view.png', alt: 'The Ribeira seen from the river', caption: 'Porto’s Ribeira from the water' },
      { file: 'ponte-luis.png', alt: 'Ponte D. Luís I from the river', caption: 'Beneath Ponte D. Luís I' },
      { file: 'teak-detail.png', alt: 'Teak deck and stainless-steel details', caption: 'Warm teak details on board' },
      { file: 'boat-porto-bridge.png', alt: 'The boat with Porto behind' },
      { file: 'boat-douro-valley.png', alt: 'Cruising the Douro' },
    ],
    'sunset-cruise': [
      { file: 'bow-sunset.png', alt: 'The bow at sunset', caption: 'Golden hour on the Douro' },
      { file: 'wine-deck.png', alt: 'A glass of wine on the teak deck', caption: 'Selected drinks at sunset' },
      { file: 'lighthouse-sunset.png', alt: 'Leaving the marina at golden hour', caption: 'Leaving Afurada' },
      { file: 'ponte-luis.png', alt: 'Ponte D. Luís I at dusk' },
      { file: 'ribeira-view.png', alt: 'Porto changing colour from the river' },
    ],
  }

  for (const [slug, photos] of Object.entries(galleryFor)) {
    const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1 })
    const doc = res.docs[0]
    if (!doc) continue
    const gallery = []
    for (const p of photos) {
      const id = await upload(p.file, p.alt)
      gallery.push({ image: id, caption: p.caption })
    }
    await payload.update({ collection: 'experiences', id: doc.id, data: { gallery } })
    payload.logger.info(`Seeded gallery: ${slug}`)
  }

  payload.logger.info('Sections seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
