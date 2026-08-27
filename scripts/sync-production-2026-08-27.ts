/**
 * One-off content sync — brings production's database up to date with the
 * FAQ restructure, Special Occasions page, blog post and small copy fixes
 * made locally on 2026-08-27. Matches existing rows by their English
 * question text rather than id, since production's ids don't necessarily
 * match the local dev database's.
 *
 * Run once, inside the production container:
 *   node --experimental-strip-types /app/scripts/sync-production-2026-08-27.ts
 */
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const payload = await getPayload({ config })

// ---------- 1. FAQ sections on existing questions ----------
const SECTION_BY_QUESTION: Record<string, string> = {
  'Where is the meeting point?': 'meeting-point',
  'How early should I arrive?': 'meeting-point',
  "What's included?": 'booking',
  'Is food included?': 'booking',
  'Are drinks included?': 'booking',
  'What happens if weather or river conditions are unsafe?': 'weather',
  'Can children join?': 'guests',
  'Can I book the boat privately?': 'booking',
  'Can I request extras for a special occasion?': 'booking',
  'Are pets allowed?': 'guests',
  'Is the route always the same?': 'booking',
}
const CHILDREN_ANSWER: Record<string, string> = {
  pt: 'Sim, as famílias são bem-vindas. Todos os hóspedes, incluindo bebés, têm de estar incluídos na reserva e contam para a capacidade máxima.',
  en: 'Yes, families are welcome. All guests, including infants, must be included in the booking and count towards maximum capacity.',
  fr: 'Oui, les familles sont les bienvenues. Tous les invités, y compris les bébés, doivent être inclus dans la réservation et comptent dans la capacité maximale.',
  es: 'Sí, las familias son bienvenidas. Todos los huéspedes, incluidos los bebés, deben incluirse en la reserva y cuentan para la capacidad máxima.',
  de: 'Ja, Familien sind willkommen. Alle Gäste, einschließlich Babys, müssen in der Buchung enthalten sein und zählen zur maximalen Kapazität.',
}

const existing = await payload.find({ collection: 'faqs', locale: 'en', limit: 100 })
let matched = 0
for (const doc of existing.docs) {
  const section = SECTION_BY_QUESTION[doc.question]
  if (!section) continue
  await payload.update({ collection: 'faqs', id: doc.id, data: { section } })
  matched++
  if (doc.question === 'Can children join?') {
    for (const [locale, answer] of Object.entries(CHILDREN_ANSWER)) {
      await payload.update({ collection: 'faqs', id: doc.id, locale: locale as 'pt', data: { answer } })
    }
  }
}
console.log(`[faqs] sections assigned to ${matched}/${existing.docs.length} existing questions`)

// ---------- 2. New FAQ entries ----------
type Entry = {
  section: string
  order: number
  pt: { q: string; a: string }
  en: { q: string; a: string }
  fr: { q: string; a: string }
  es: { q: string; a: string }
  de: { q: string; a: string }
}
const NEW_ENTRIES: Entry[] = [
  {
    section: 'meeting-point', order: 3,
    pt: { q: 'E se eu chegar atrasado?', a: 'Os cruzeiros partem à hora marcada. Chegadas atrasadas não podem atrasar a partida e não têm direito a reembolso.' },
    en: { q: 'What if I arrive late?', a: 'Cruises depart on time. Late arrivals cannot delay departure and are non-refundable.' },
    fr: { q: "Que se passe-t-il si j'arrive en retard ?", a: "Les croisières partent à l'heure prévue. Les arrivées tardives ne peuvent pas retarder le départ et ne sont pas remboursables." },
    es: { q: '¿Qué pasa si llego tarde?', a: 'Los cruceros salen a la hora prevista. Las llegadas tardías no pueden retrasar la salida y no son reembolsables.' },
    de: { q: 'Was passiert, wenn ich zu spät komme?', a: 'Die Fahrten starten pünktlich. Verspätete Ankünfte können die Abfahrt nicht verzögern und werden nicht erstattet.' },
  },
  {
    section: 'getting-here', order: 1,
    pt: { q: 'Como chego até lá?', a: 'Procure por «Douro Wonders» ou «Douro Marina Afurada» no Google Maps e dirija-se ao Gate B. O trânsito no Porto pode complicar-se nas horas de ponta, sobretudo ao final da tarde e perto do pôr do sol — reserve um pouco mais de tempo.' },
    en: { q: 'How do I get there?', a: 'Search for Douro Wonders or Douro Marina Afurada on Google Maps and head to Gate B. Porto traffic can be busy at peak hours, especially late afternoon and around sunset — please leave a little extra time.' },
    fr: { q: "Comment s'y rendre ?", a: "Recherchez « Douro Wonders » ou « Douro Marina Afurada » sur Google Maps et dirigez-vous vers le Gate B. La circulation à Porto peut être dense aux heures de pointe, surtout en fin d'après-midi et au coucher du soleil — prévoyez un peu de temps supplémentaire." },
    es: { q: '¿Cómo llego hasta allí?', a: 'Busca «Douro Wonders» o «Douro Marina Afurada» en Google Maps y dirígete a la Gate B. El tráfico en Oporto puede complicarse en horas punta, sobre todo a última hora de la tarde y cerca del atardecer — deja un poco más de tiempo.' },
    de: { q: 'Wie komme ich dorthin?', a: 'Suchen Sie auf Google Maps nach „Douro Wonders" oder „Douro Marina Afurada" und gehen Sie zum Gate B. Der Verkehr in Porto kann zu Stoßzeiten dicht sein, besonders am späten Nachmittag und bei Sonnenuntergang — planen Sie etwas mehr Zeit ein.' },
  },
  {
    section: 'getting-here', order: 2,
    pt: { q: 'Onde posso estacionar?', a: 'Normalmente há estacionamento público disponível na zona da marina. A disponibilidade varia com a época e o dia — conte com uma pequena caminhada desde o seu lugar de estacionamento.' },
    en: { q: 'Where can I park?', a: 'Public parking is usually available around the marina area. Availability varies with season and day — please plan for a short walk from your parking spot.' },
    fr: { q: 'Où puis-je me garer ?', a: 'Un parking public est généralement disponible autour de la marina. La disponibilité varie selon la saison et le jour — prévoyez une courte marche depuis votre place de stationnement.' },
    es: { q: '¿Dónde puedo aparcar?', a: 'Normalmente hay aparcamiento público disponible en la zona de la marina. La disponibilidad varía según la temporada y el día — cuenta con un pequeño paseo desde tu plaza de aparcamiento.' },
    de: { q: 'Wo kann ich parken?', a: 'Rund um die Marina ist in der Regel öffentliches Parken möglich. Die Verfügbarkeit variiert je nach Saison und Tag — planen Sie einen kurzen Fußweg von Ihrem Parkplatz ein.' },
  },
  {
    section: 'getting-here', order: 3,
    pt: { q: 'Vou de táxi ou Uber — o que digo ao motorista?', a: 'Peça para o deixar na Douro Marina, Afurada. O ponto de largada fica perto da entrada da marina.' },
    en: { q: "I'm arriving by taxi or rideshare — what do I tell the driver?", a: 'Ask the driver for Douro Marina, Afurada. Drop-off is close to the marina entrance.' },
    fr: { q: 'Je viens en taxi ou en VTC — que dire au chauffeur ?', a: "Demandez à être déposé à Douro Marina, Afurada. La dépose se trouve près de l'entrée de la marina." },
    es: { q: 'Llego en taxi o VTC — ¿qué le digo al conductor?', a: 'Pide que te deje en Douro Marina, Afurada. El punto de bajada está cerca de la entrada de la marina.' },
    de: { q: 'Ich komme mit dem Taxi oder Fahrdienst — was sage ich dem Fahrer?', a: 'Bitten Sie um die Adresse Douro Marina, Afurada. Der Ausstiegspunkt liegt nahe am Eingang der Marina.' },
  },
  {
    section: 'onboard', order: 1,
    pt: { q: 'O que devo vestir?', a: 'Roupa em camadas confortáveis, óculos de sol e um casaco leve para a brisa do rio — mesmo no verão, as partidas ao pôr do sol podem ser mais frescas na água. Há cobertores disponíveis a bordo caso sejam precisos.' },
    en: { q: 'What should I wear?', a: 'Comfortable layers, sunglasses and a light jacket for the river breeze — even in summer, sunset departures can feel cooler on the water. Blankets are available onboard if needed.' },
    fr: { q: 'Que dois-je porter ?', a: "Des vêtements confortables en couches, des lunettes de soleil et une veste légère pour la brise du fleuve — même en été, les départs au coucher du soleil peuvent être plus frais sur l'eau. Des couvertures sont disponibles à bord si besoin." },
    es: { q: '¿Qué debo ponerme?', a: 'Ropa cómoda por capas, gafas de sol y una chaqueta ligera para la brisa del río — incluso en verano, las salidas al atardecer pueden sentirse más frescas sobre el agua. Hay mantas disponibles a bordo si se necesitan.' },
    de: { q: 'Was soll ich anziehen?', a: 'Bequeme Schichten, eine Sonnenbrille und eine leichte Jacke für die Flussbrise — selbst im Sommer kann es bei Sonnenuntergangsfahrten auf dem Wasser kühler sein. Bei Bedarf stehen Decken an Bord zur Verfügung.' },
  },
  {
    section: 'onboard', order: 2,
    pt: { q: 'Mantenho os sapatos calçados a bordo?', a: 'Sim, os hóspedes mantêm os sapatos calçados. Calçado de sola macia é bem-vindo.' },
    en: { q: 'Do I keep my shoes on onboard?', a: 'Yes, guests keep their shoes on. Soft-soled shoes are welcome.' },
    fr: { q: 'Dois-je garder mes chaussures à bord ?', a: 'Oui, les invités gardent leurs chaussures. Les chaussures à semelle souple sont les bienvenues.' },
    es: { q: '¿Mantengo los zapatos puestos a bordo?', a: 'Sí, los huéspedes mantienen el calzado puesto. Se recomienda calzado de suela blanda.' },
    de: { q: 'Behalte ich meine Schuhe an Bord an?', a: 'Ja, Gäste behalten ihre Schuhe an. Schuhe mit weicher Sohle sind willkommen.' },
  },
  {
    section: 'onboard', order: 3,
    pt: { q: 'Há casa de banho a bordo?', a: 'A embarcação não tem casa de banho a bordo. Por favor, utilize as instalações da marina antes de embarcar.' },
    en: { q: 'Is there a toilet onboard?', a: 'The vessel does not have onboard facilities. Please use the marina before boarding.' },
    fr: { q: 'Y a-t-il des toilettes à bord ?', a: "Le bateau ne dispose pas de toilettes à bord. Merci d'utiliser celles de la marina avant l'embarquement." },
    es: { q: '¿Hay baño a bordo?', a: 'La embarcación no dispone de baño a bordo. Por favor, utiliza las instalaciones de la marina antes de embarcar.' },
    de: { q: 'Gibt es eine Toilette an Bord?', a: 'Das Boot verfügt nicht über eine Toilette an Bord. Bitte nutzen Sie die Einrichtungen der Marina vor dem Einsteigen.' },
  },
  {
    section: 'guests', order: 1,
    pt: { q: 'Qual é a capacidade máxima?', a: 'Até 12 hóspedes por cruzeiro, incluindo bebés.' },
    en: { q: "What's the maximum capacity?", a: 'Up to 12 guests per cruise, including infants.' },
    fr: { q: 'Quelle est la capacité maximale ?', a: "Jusqu'à 12 personnes par croisière, bébés inclus." },
    es: { q: '¿Cuál es la capacidad máxima?', a: 'Hasta 12 personas por crucero, incluidos los bebés.' },
    de: { q: 'Wie hoch ist die maximale Kapazität?', a: 'Bis zu 12 Gäste pro Fahrt, Babys eingeschlossen.' },
  },
  {
    section: 'guests', order: 4,
    pt: { q: 'O barco é acessível para pessoas com mobilidade reduzida?', a: 'O embarque implica descer do pontão para a embarcação. Hóspedes com mobilidade reduzida são bem-vindos — contacte-nos com antecedência para o ajudarmos a planear a visita.' },
    en: { q: 'Is the boat accessible for guests with reduced mobility?', a: 'Boarding requires stepping down from the pontoon onto the vessel. Guests with reduced mobility are welcome — please contact us in advance so we can help plan your visit.' },
    fr: { q: 'Le bateau est-il accessible aux personnes à mobilité réduite ?', a: "L'embarquement implique de descendre du ponton vers le bateau. Les personnes à mobilité réduite sont les bienvenues — contactez-nous à l'avance pour que nous puissions vous aider à planifier votre visite." },
    es: { q: '¿El barco es accesible para personas con movilidad reducida?', a: 'El embarque implica bajar del pantalán a la embarcación. Las personas con movilidad reducida son bienvenidas — contáctanos con antelación para ayudarte a planificar la visita.' },
    de: { q: 'Ist das Boot für Gäste mit eingeschränkter Mobilität zugänglich?', a: 'Beim Einsteigen muss man vom Steg auf das Boot hinuntersteigen. Gäste mit eingeschränkter Mobilität sind willkommen — bitte kontaktieren Sie uns im Voraus, damit wir Ihren Besuch mitplanen können.' },
  },
  {
    section: 'guests', order: 5,
    pt: { q: 'Enjoo-me facilmente — o que aconselham?', a: 'O rio é geralmente muito calmo. Se for particularmente sensível, recomendamos tomar uma precaução ligeira antes de embarcar.' },
    en: { q: 'I get motion sick easily — any advice?', a: 'The river is generally very smooth. If you are particularly sensitive, we recommend taking a light precaution before boarding.' },
    fr: { q: "J'ai facilement le mal des transports — un conseil ?", a: "Le fleuve est généralement très calme. Si vous êtes particulièrement sensible, nous recommandons de prendre une légère précaution avant l'embarquement." },
    es: { q: 'Me mareo con facilidad — ¿algún consejo?', a: 'El río es generalmente muy tranquilo. Si eres especialmente sensible, recomendamos tomar una ligera precaución antes de embarcar.' },
    de: { q: 'Ich werde leicht seekrank — haben Sie einen Tipp?', a: 'Der Fluss ist in der Regel sehr ruhig. Wenn Sie besonders empfindlich sind, empfehlen wir eine leichte Vorsichtsmaßnahme vor dem Einsteigen.' },
  },
  {
    section: 'weather', order: 2,
    pt: { q: 'O horário do Cruzeiro Pôr do Sol muda ao longo do ano?', a: 'Sim, o horário de partida do Cruzeiro Pôr do Sol muda com a época, para acompanhar a luz do fim de tarde.' },
    en: { q: 'Does the Sunset Cruise time change during the year?', a: 'Yes, the Sunset Cruise departure time changes seasonally to follow the evening light.' },
    fr: { q: "L'heure de la croisière au coucher du soleil change-t-elle selon la saison ?", a: "Oui, l'heure de départ de la croisière au coucher du soleil change selon la saison, pour suivre la lumière du soir." },
    es: { q: '¿El horario del Crucero Atardecer cambia según la época del año?', a: 'Sí, la hora de salida del Crucero Atardecer cambia según la temporada, para seguir la luz del atardecer.' },
    de: { q: 'Ändert sich die Uhrzeit der Sunset Cruise im Jahresverlauf?', a: 'Ja, die Abfahrtszeit der Sunset Cruise ändert sich saisonal, um dem Abendlicht zu folgen.' },
  },
  {
    section: 'weather', order: 3,
    pt: { q: 'E se eu não aparecer?', a: 'As não comparências (no-shows) não têm direito a reembolso.' },
    en: { q: "What if I don't show up?", a: 'No-shows are non-refundable.' },
    fr: { q: 'Que se passe-t-il si je ne me présente pas ?', a: 'Les absences (no-shows) ne sont pas remboursables.' },
    es: { q: '¿Qué pasa si no me presento?', a: 'Las ausencias (no-shows) no son reembolsables.' },
    de: { q: 'Was passiert, wenn ich nicht erscheine?', a: 'Nichterscheinen (No-Shows) wird nicht erstattet.' },
  },
]

for (const entry of NEW_ENTRIES) {
  const already = await payload.find({ collection: 'faqs', locale: 'en', where: { question: { equals: entry.en.q } }, limit: 1 })
  if (already.docs.length) {
    console.log(`[faqs] skip (exists): ${entry.en.q}`)
    continue
  }
  const created = await payload.create({
    collection: 'faqs',
    locale: 'en',
    data: { question: entry.en.q, answer: entry.en.a, section: entry.section as never, order: entry.order },
  })
  for (const locale of ['pt', 'fr', 'es', 'de'] as const) {
    await payload.update({ collection: 'faqs', id: created.id, locale, data: { question: entry[locale].q, answer: entry[locale].a } })
  }
  console.log(`[faqs] created: ${entry.en.q}`)
}

// ---------- 3. Boat "Seating" spec text ----------
const SEATING_VALUES: Record<string, string> = { pt: 'Sofá em U', en: 'U-shaped lounge', fr: 'Banquette en U', es: 'Sofá en U', de: 'U-förmige Sitzbank' }
for (const locale of ['pt', 'en', 'fr', 'es', 'de'] as const) {
  const home = await payload.findGlobal({ slug: 'homepage', locale })
  const specs = (home?.boat?.specs || []).map((s: { label: string; value: string }) =>
    /seat|assent|sitz|banc|asient/i.test(s.label) ? { ...s, value: SEATING_VALUES[locale] } : s,
  )
  if (specs.length) {
    await payload.updateGlobal({ slug: 'homepage', locale, data: { boat: { ...home.boat, specs } } })
  }
}
console.log('[homepage] seating spec updated')

// ---------- 4. Meeting point Google Maps link ----------
const settings = await payload.findGlobal({ slug: 'site-settings' })
await payload.updateGlobal({
  slug: 'site-settings',
  data: { meetingPoint: { ...settings.meetingPoint, mapsUrl: 'https://maps.app.goo.gl/YnCcykMwA6u1g2f88' } },
})
console.log('[site-settings] maps url updated')

// ---------- 5. Special Occasions page content ----------
type Content = { eyebrow: string; title: string; intro: string; ideas: string[] }
const SO_CONTENT: Record<'en' | 'pt' | 'fr' | 'es' | 'de', Content> = {
  en: { eyebrow: 'Special Occasions', title: 'Planning something to remember?', intro: 'A proposal, a wedding toast, an anniversary, a milestone birthday — tell us your idea and we’ll help shape a private cruise around it. Flowers, cake, a photographer, a specific song for the moment — if it fits on the river, we’ll do our best to make it happen.', ideas: ['Marriage proposals', 'Wedding toasts and elopements', 'Anniversaries', 'Milestone birthdays', 'Bachelor & bachelorette celebrations', 'Small corporate gatherings'] },
  pt: { eyebrow: 'Ocasiões Especiais', title: 'A planear algo para recordar?', intro: 'Um pedido de casamento, um brinde de casamento, um aniversário, uma data especial — conte-nos a sua ideia e ajudamos a construir um cruzeiro privado à sua volta. Flores, bolo, um fotógrafo, uma música certa para o momento — se couber no rio, fazemos os possíveis para acontecer.', ideas: ['Pedidos de casamento', 'Brindes de casamento e fugas românticas', 'Aniversários de casamento', 'Aniversários redondos', 'Despedidas de solteiro(a)', 'Pequenos eventos de empresa'] },
  fr: { eyebrow: 'Occasions Spéciales', title: 'Vous préparez un moment inoubliable ?', intro: 'Une demande en mariage, un toast de mariage, un anniversaire, une date marquante — dites-nous votre idée et nous vous aiderons à organiser une croisière privée autour de celle-ci. Fleurs, gâteau, photographe, une chanson précise pour l’instant — si cela tient sur le fleuve, nous ferons de notre mieux pour que cela arrive.', ideas: ['Demandes en mariage', 'Toasts de mariage et escapades romantiques', 'Anniversaires de mariage', 'Anniversaires marquants', 'Enterrements de vie de garçon/jeune fille', 'Petits événements d’entreprise'] },
  es: { eyebrow: 'Ocasiones Especiales', title: '¿Preparando algo para recordar?', intro: 'Una pedida de mano, un brindis de boda, un aniversario, una fecha especial — cuéntanos tu idea y te ayudamos a organizar un crucero privado a su alrededor. Flores, tarta, un fotógrafo, una canción concreta para el momento — si cabe en el río, haremos lo posible para que ocurra.', ideas: ['Pedidas de mano', 'Brindis de boda y escapadas románticas', 'Aniversarios de boda', 'Cumpleaños redondos', 'Despedidas de soltero/a', 'Pequeños eventos de empresa'] },
  de: { eyebrow: 'Besondere Anlässe', title: 'Planen Sie etwas Unvergessliches?', intro: 'Ein Heiratsantrag, ein Hochzeitstoast, ein Jubiläum, ein besonderes Datum — erzählen Sie uns Ihre Idee, und wir helfen, eine private Fahrt darum herum zu gestalten. Blumen, Torte, ein Fotograf, ein bestimmtes Lied für den Moment — wenn es auf den Fluss passt, tun wir unser Bestes, damit es Wirklichkeit wird.', ideas: ['Heiratsanträge', 'Hochzeitstoasts und romantische Fluchten', 'Hochzeitstage', 'Runde Geburtstage', 'Junggesell(inn)enabschiede', 'Kleine Firmenfeiern'] },
}
for (const locale of ['en', 'pt', 'fr', 'es', 'de'] as const) {
  const c = SO_CONTENT[locale]
  await payload.updateGlobal({ slug: 'special-occasions', locale, data: { eyebrow: c.eyebrow, title: c.title, intro: c.intro, ideas: c.ideas.map((text) => ({ text })) } })
}
console.log('[special-occasions] content seeded in 5 locales')

// ---------- 6. Blog post ----------
const already = await payload.find({ collection: 'posts', locale: 'en', where: { slug: { equals: 'special-occasions-douro-cruise' } }, limit: 1 })
if (already.docs.length) {
  console.log('[posts] skip (exists): special-occasions-douro-cruise')
} else {
  const text = (t: string, bold = false) => ({ type: 'text', detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '', text: t, version: 1 })
  const paragraph = (...parts: Array<string | [string, boolean]>) => ({ type: 'paragraph', children: parts.map((p) => (Array.isArray(p) ? text(p[0], p[1]) : text(p))), direction: 'ltr', format: '', indent: 0, version: 1, textFormat: 0, textStyle: '' })
  const heading = (t: string) => ({ type: 'heading', tag: 'h2', children: [text(t)], direction: 'ltr', format: '', indent: 0, version: 1 })
  const listItem = (t: string, value: number) => ({ type: 'listitem', children: [text(t)], direction: 'ltr', format: '', indent: 0, version: 1, value })
  const list = (items: string[]) => ({ type: 'list', listType: 'bullet', start: 1, tag: 'ul', children: items.map((t, i) => listItem(t, i + 1)), direction: 'ltr', format: '', indent: 0, version: 1 })
  const doc = (children: unknown[]) => ({ root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } })

  const en = doc([
    paragraph('Some afternoons on the river call for company — a small group, new faces, the easy rhythm of a shared cruise. Others call for something else entirely: just your people, your pace, and a boat that’s yours for the hour.'),
    heading('A ring, a toast, a “yes”'),
    paragraph('Golden hour on the Douro has a way of making a moment feel inevitable. We’ve had guests ask the question just as Porto’s rooftops turn amber behind them, ring tucked in a jacket pocket the whole afternoon. A private cruise means no strangers around when it happens — just the two of you, your host quietly at the helm, and a glass of something cold waiting for the “yes.”'),
    heading('Anniversaries and milestones'),
    paragraph('A tenth anniversary, a fortieth birthday, a retirement worth marking properly — these are the afternoons people remember for the wrong reasons if they’re rushed or crowded. On a private cruise, the schedule bends a little to fit the celebration, not the other way around.'),
    heading('Making it yours'),
    paragraph('Flowers waiting on the seat when your guest arrives. A cake for the trip back. A specific song queued up for the exact bend in the river where the view opens up. None of it is complicated for us — it’s mostly about knowing in advance. Tell us the idea, however small or specific, and we’ll tell you honestly what’s possible.'),
    list(['Flowers or a small bouquet', 'A cake or dessert for the return leg', 'A specific song for a specific moment', 'A photographer to capture it from the water']),
    heading('How it works'),
    paragraph('A private cruise means the whole boat is yours — for your group only, at a time that works within our availability, on either the Day Cruise or the Sunset Cruise. If you’re planning something and want a hand shaping it, our ', ['Special Occasions', true], ' page has a short form built for exactly this: tell us the occasion, the date you have in mind, and anything you’re picturing. We’ll take it from there.'),
  ])
  const pt = doc([
    paragraph('Há tardes no rio que pedem companhia — um grupo pequeno, caras novas, o ritmo fácil de um cruzeiro partilhado. Outras pedem uma coisa completamente diferente: só as suas pessoas, ao seu ritmo, numa embarcação que é sua por uma hora.'),
    heading('Um anel, um brinde, um “sim”'),
    paragraph('A hora dourada no Douro tem uma forma de tornar um momento inevitável. Já tivemos hóspedes a fazer o pedido mesmo quando os telhados do Porto ficam cor de âmbar atrás deles, o anel guardado no bolso do casaco a tarde toda. Um cruzeiro privado significa que não há estranhos por perto quando acontece — só os dois, o anfitrião discretamente ao leme, e um copo de algo fresco à espera do “sim.”'),
    heading('Aniversários e datas redondas'),
    paragraph('Um décimo aniversário de casamento, um quadragésimo aniversário, uma reforma que merece ser celebrada como deve ser — são tardes que as pessoas recordam pelas razões erradas se forem apressadas ou cheias de gente. Num cruzeiro privado, o horário ajusta-se um pouco à celebração, não o contrário.'),
    heading('Torná-lo seu'),
    paragraph('Flores à espera no lugar quando o seu convidado chega. Um bolo para o regresso. Uma música certa programada para a curva exata do rio onde a vista se abre. Nada disto é complicado para nós — é sobretudo uma questão de sabermos com antecedência. Diga-nos a ideia, por mais pequena ou específica que seja, e diremos honestamente o que é possível.'),
    list(['Flores ou um pequeno ramo', 'Um bolo ou sobremesa para o regresso', 'Uma música certa para um momento certo', 'Um fotógrafo para captar tudo a partir do rio']),
    heading('Como funciona'),
    paragraph('Um cruzeiro privado significa que a embarcação toda é sua — só para o seu grupo, numa hora que encaixe na nossa disponibilidade, tanto no Cruzeiro Diurno como no Cruzeiro Pôr do Sol. Se está a planear algo e quer ajuda a dar-lhe forma, a nossa página de ', ['Ocasiões Especiais', true], ' tem um formulário curto feito exatamente para isto: diga-nos a ocasião, a data que tem em mente, e o que está a imaginar. Tratamos do resto.'),
  ])

  const media = await payload.find({ collection: 'media', where: { filename: { equals: 'bow-sunset.png' } }, limit: 1 })
  const coverImage = media.docs[0]?.id

  const created = await payload.create({
    collection: 'posts',
    locale: 'en',
    data: {
      title: 'Celebrating Onboard: Proposals, Anniversaries and Special Occasions on the Douro',
      slug: 'special-occasions-douro-cruise',
      excerpt: 'From marriage proposals to milestone birthdays, here’s how a private cruise on the Douro can become the backdrop for a moment you’ll remember.',
      coverImage,
      content: en,
      status: 'published',
      publishedAt: new Date().toISOString(),
      category: 'onboard',
      author: 'Douro Wonders',
      readingMinutes: 4,
    },
  })
  await payload.update({
    collection: 'posts',
    id: created.id,
    locale: 'pt',
    data: {
      title: 'Celebrar a Bordo: Pedidos de Casamento, Aniversários e Ocasiões Especiais no Douro',
      excerpt: 'De pedidos de casamento a aniversários redondos, veja como um cruzeiro privado no Douro pode ser o cenário para um momento que vai recordar.',
      content: pt,
    },
  })
  console.log('[posts] created: special-occasions-douro-cruise')
}

console.log('DONE')
process.exit(0)
