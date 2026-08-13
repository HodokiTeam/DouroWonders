/**
 * Fills The Boat section and the public phone numbers.
 * Run with: npx tsx --env-file=.env src/seed-boat.ts (stop the dev server first)
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

  const boatId = await upload('boat-douro-valley.png', 'The Douro Wonders boat cruising the river')

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      boat: {
        headline: 'Comfort, teak and open views',
        body: 'A robust and comfortable boat, purpose-suited to the Douro, with cushioned seating, warm teak details and all-weather canopies that extend the season. Small by design — so every guest has space, views and the attention of the hosts.',
        specs: [
          { label: 'Guests', value: 'Up to 12' },
          { label: 'Crew', value: 'Skipper + host' },
          { label: 'Seating', value: 'Cushioned lounge' },
          { label: 'Season', value: 'All-weather canopies' },
        ],
        image: boatId,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      phones: [
        { label: 'António', number: '+351 918 030 672' },
        { label: 'Inês', number: '+351 918 526 585' },
      ],
    },
  })

  payload.logger.info('Boat + phones seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
