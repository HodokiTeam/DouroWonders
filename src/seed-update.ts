/**
 * Content update — July 2026:
 *  · private prices (420 day / 620 sunset)
 *  · full sightseeing itineraries for both cruises (EN + PT)
 *  · "Wondy" / "embarcação" wording in Portuguese
 * Run with: npx tsx --env-file=.env src/seed-update.ts (stop the dev server first)
 */
import { getPayload } from 'payload'
import config from './payload.config'

type Stop = { stop: string; note?: string }

const dayEn: Stop[] = [
  { stop: 'Douro Marina, Afurada', note: 'Check-in at Gate B · departure' },
  { stop: 'Ponte da Arrábida', note: 'Welcome drink as you pass beneath' },
  { stop: 'Ponte Ferreirinha', note: 'Under construction' },
  { stop: 'Tram Museum' },
  { stop: 'Massarelos Parish Church' },
  { stop: 'Crystal Palace Gardens' },
  { stop: 'Alfândega — Porto Customs House', note: 'Historic mooring rings beside the water' },
  { stop: 'Jardim das Virtudes' },
  { stop: 'Ribeira do Douro' },
  { stop: 'Clérigos Tower' },
  { stop: 'Porto Cathedral (Sé)' },
  { stop: 'Episcopal Palace of Porto' },
  { stop: 'Cais de Gaia & the Port wine cellars' },
  { stop: 'Rabelo boats' },
  { stop: 'Serra do Pilar Monastery' },
  { stop: 'Jardim do Morro' },
  { stop: 'Ponte D. Luís I', note: 'Photo moment under the bridge' },
  { stop: 'Fernandina Wall' },
  { stop: 'Ponte do Infante D. Henrique' },
  { stop: 'Ponte D. Maria Pia', note: 'Eiffel’s railway bridge, 1877' },
  { stop: 'Ponte São João' },
  { stop: 'Ponte do Freixo', note: 'The turning point' },
  { stop: 'Afurada Fishing Village', note: 'Return to Douro Marina' },
]

const sunsetExtraEn: Stop[] = [
  { stop: 'Farol de São Miguel-o-Anjo' },
  { stop: 'Douro Estuary Nature Reserve' },
  { stop: 'Passeio Alegre' },
  { stop: 'São João da Foz Fortress' },
  { stop: 'Farol de Felgueiras' },
  { stop: 'Foz do Douro', note: 'Where the river meets the Atlantic' },
]

const dayPt: Stop[] = [
  { stop: 'Douro Marina, Afurada', note: 'Check-in no Gate B · partida' },
  { stop: 'Ponte da Arrábida', note: 'Bebida de boas-vindas ao passar por baixo' },
  { stop: 'Ponte Ferreirinha', note: 'Em construção' },
  { stop: 'Museu do Carro Eléctrico' },
  { stop: 'Igreja Paroquial de Massarelos' },
  { stop: 'Jardins do Palácio de Cristal' },
  { stop: 'Alfândega do Porto', note: 'Argolas de amarração históricas junto à água' },
  { stop: 'Jardim das Virtudes' },
  { stop: 'Ribeira do Douro' },
  { stop: 'Torre dos Clérigos' },
  { stop: 'Catedral da Sé' },
  { stop: 'Paço Episcopal do Porto' },
  { stop: 'Cais de Gaia e Caves do Vinho do Porto' },
  { stop: 'Barcos Rabelo' },
  { stop: 'Mosteiro da Serra do Pilar' },
  { stop: 'Jardim do Morro' },
  { stop: 'Ponte Luís I', note: 'Momento de fotografia sob a ponte' },
  { stop: 'Muralha Fernandina' },
  { stop: 'Ponte do Infante Dom Henrique' },
  { stop: 'Ponte Dona Maria Pia', note: 'A ponte ferroviária de Eiffel, 1877' },
  { stop: 'Ponte São João' },
  { stop: 'Ponte do Freixo', note: 'O ponto de retorno' },
  { stop: 'Afurada Fishing Village', note: 'Regresso à Douro Marina' },
]

const sunsetExtraPt: Stop[] = [
  { stop: 'Farol de São Miguel-o-Anjo' },
  { stop: 'Reserva Natural do Estuário do Douro' },
  { stop: 'Passeio Alegre' },
  { stop: 'Fortaleza de São João da Foz' },
  { stop: 'Farol de Felgueiras' },
  { stop: 'Foz do Douro', note: 'Onde o rio encontra o Atlântico' },
]

const highlightsEn = {
  'day-cruise': [
    { text: 'See all seven Porto bridges from the water in 90 minutes' },
    { text: 'Enjoy a welcome Porto Tonic, with water or juice also available' },
    { text: 'Hear local stories and recommendations from warm, experienced hosts' },
    { text: 'Capture memorable photos with Dom Luís I Bridge as your backdrop' },
    { text: 'Small groups of up to 12 guests, hosted by the founders' },
  ],
  'sunset-cruise': [
    { text: 'All seven Porto bridges plus the run out to the Atlantic at golden hour' },
    { text: 'Enjoy a welcome Porto Tonic, with water or juice also available' },
    { text: 'Watch Porto and Gaia change colour from the river' },
    { text: 'Pass the Felgueiras lighthouse and the mouth of the Douro' },
    { text: 'Small groups of up to 12 guests, hosted by the founders' },
  ],
}

const highlightsPt = {
  'day-cruise': [
    { text: 'Veja as sete pontes do Porto a partir do rio em 90 minutos' },
    { text: 'Porto Tónico de boas-vindas, com água ou sumo em alternativa' },
    { text: 'Histórias e recomendações locais de anfitriões experientes' },
    { text: 'Fotografias memoráveis com a Ponte Luís I como cenário' },
    { text: 'Grupos pequenos até 12 pessoas, com os fundadores a bordo' },
  ],
  'sunset-cruise': [
    { text: 'As sete pontes do Porto e a saída até ao Atlântico na hora dourada' },
    { text: 'Porto Tónico de boas-vindas, com água ou sumo em alternativa' },
    { text: 'Veja o Porto e Gaia a mudar de cor a partir do rio' },
    { text: 'Passe pelo Farol de Felgueiras e pela foz do Douro' },
    { text: 'Grupos pequenos até 12 pessoas, com os fundadores a bordo' },
  ],
}

async function run() {
  const payload = await getPayload({ config })

  const byId: Record<string, number> = {}
  for (const slug of ['day-cruise', 'sunset-cruise']) {
    const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1 })
    if (res.docs[0]) byId[slug] = res.docs[0].id as number
  }

  // ---- Prices (not localized — one value for every language) ----
  await payload.update({
    collection: 'experiences',
    id: byId['day-cruise'],
    data: { private: { launchPrice: 420 } },
  })
  await payload.update({
    collection: 'experiences',
    id: byId['sunset-cruise'],
    data: { private: { launchPrice: 620 } },
  })
  payload.logger.info('Updated private prices: day 420 / sunset 620')

  // ---- Itineraries + highlights ----
  const plans: Array<[string, 'en' | 'pt', Stop[], { text: string }[]]> = [
    ['day-cruise', 'en', dayEn, highlightsEn['day-cruise']],
    ['sunset-cruise', 'en', [...dayEn, ...sunsetExtraEn], highlightsEn['sunset-cruise']],
    ['day-cruise', 'pt', dayPt, highlightsPt['day-cruise']],
    ['sunset-cruise', 'pt', [...dayPt, ...sunsetExtraPt], highlightsPt['sunset-cruise']],
  ]

  for (const [slug, locale, itinerary, highlights] of plans) {
    await payload.update({
      collection: 'experiences',
      id: byId[slug],
      locale,
      data: { details: { itinerary, highlights } },
    })
    payload.logger.info(`Itinerary ${slug} [${locale}]: ${itinerary.length} stops`)
  }

  // ---- Portuguese wording: Wondy / embarcação ----
  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'pt',
    data: {
      boat: {
        headline: 'Conheça a Wondy',
        body: 'Uma embarcação robusta e confortável, pensada para o Douro, com sofás acolchoados, detalhes em teca e capotas que prolongam a época. Pequena por opção — para que cada convidado tenha espaço, vistas e a atenção dos anfitriões.',
        specs: [
          { label: 'Pessoas', value: 'Até 12' },
          { label: 'Tripulação', value: 'Skipper + anfitrião' },
          { label: 'Assentos', value: 'Sofá acolchoado' },
          { label: 'Época', value: 'Capotas para todo o tempo' },
        ],
      },
      experiencesSection: {
        privateTag: 'Por embarcação · o seu grupo, o seu momento, o nosso rio',
      },
    },
  })
  await payload.update({
    collection: 'experiences',
    id: byId['day-cruise'],
    locale: 'pt',
    data: {
      private: {
        shortCopy:
          'As suas pessoas, o seu momento, o nosso rio. Reserve a embarcação em privado para uma experiência no Douro pensada para o seu grupo, com bebidas, sabores locais e os detalhes que a tornam sua.',
      },
    },
  })
  await payload.update({
    collection: 'experiences',
    id: byId['sunset-cruise'],
    locale: 'pt',
    data: {
      private: {
        shortCopy:
          'Um cruzeiro privado ao pôr do sol no Douro para o seu grupo, a bordo da Wondy, com conhecimento local, bom gosto, bebidas selecionadas, sabores locais e as melhores vistas de fim de tarde do Porto e de Vila Nova de Gaia.',
      },
    },
  })
  payload.logger.info('Updated Portuguese wording (Wondy / embarcação)')

  payload.logger.info('Content update complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
