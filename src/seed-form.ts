/**
 * Points the contact form at the Hodoki delivery endpoint.
 * Run with: npx tsx --env-file=.env src/seed-form.ts (stop the dev server first)
 */
import { getPayload } from 'payload'
import config from './payload.config'

async function run() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { formEndpoint: 'https://forms.hodoki.pt/f/uMKIu827J8zcBSwl' },
  })
  payload.logger.info('Contact form endpoint set')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
