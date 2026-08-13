/**
 * Uploads the real photos from the investor pitch and points the Homepage
 * global at them (hero, founders, route map). Also fills the founder bios.
 * Run with: npx tsx --env-file=.env src/seed-media.ts
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

  const heroId = await upload('boat-porto-bridge.png', 'The Douro Wonders boat on the river with Porto and Ponte D. Luís I behind')
  const foundersId = await upload('founders-onboard.png', 'Inês and António on board on the Douro')
  const inesId = await upload('ines-helm.png', 'Inês Veloso at the helm')
  const antonioId = await upload('antonio-helm.png', 'António Ferrer at the helm')
  const routeMapId = await upload('route-map.png', 'Route map between Porto and Vila Nova de Gaia')

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: { image: heroId },
      founders: {
        image: foundersId,
        ines: {
          name: 'Inês Veloso',
          role: 'Guest experience & creative direction',
          bio: 'Inês shapes the guest experience, communication, creative direction and the small details that make the moment feel considered. With a doctorate in Fine Arts, international experience in maritime tourism in Australia and international maritime certifications (STCW, LROCP, Coxswain Grade 1), she brings photography, art direction and genuine hosting to every cruise.',
          photo: inesId,
        },
        antonio: {
          name: 'António Ferrer',
          role: 'Skipper — navigation & safety',
          bio: 'António is responsible for the maritime operation, navigation and safety. An experienced skipper on the Douro since 2019, he knows the river personally — its bridges, its stories and its quieter corners — and brings that deep local knowledge to every departure.',
          photo: antonioId,
        },
      },
      route: { image: routeMapId },
    },
  })

  payload.logger.info('Media + founders update complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
