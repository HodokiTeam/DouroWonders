/**
 * Restores two English fields that a later partial updateGlobal wiped:
 * homepage.boat.specs and homepage.included.items. Both are localised arrays,
 * and writing their parent group without them clears the array.
 * Run with: npx tsx --env-file=.env src/seed-repair.ts
 */
import { getPayload } from 'payload'
import config from './payload.config'

async function run() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'homepage', locale: 'en' })

  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'en',
    data: {
      boat: {
        ...home.boat,
        specs: [
          { label: 'Guests', value: 'Up to 12' },
          { label: 'Crew', value: 'Skipper + host' },
          { label: 'Seating', value: 'Cushioned lounge' },
          { label: 'Season', value: 'All-weather canopies' },
        ],
      },
      included: {
        ...home.included,
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
    },
  })

  payload.logger.info('Restored English boat.specs and included.items')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
