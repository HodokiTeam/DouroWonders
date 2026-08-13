/**
 * Seeds the blog with SEO articles written in the Douro Wonders voice.
 * Run with: npx tsx --env-file=.env src/seed-blog.ts (stop the dev server first)
 * Re-running updates the existing posts by slug.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'
import { md, readingMinutes } from './lib/lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const img = (name: string) => path.resolve(dirname, '../public/images', name)

type Article = {
  slug: string
  title: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  keywords: string
  cover: { file: string; alt: string }
  category: 'guides' | 'onboard' | 'local' | 'news'
  related?: 'day-cruise' | 'sunset-cruise'
  publishedAt: string
  body: string
}

const articles: Article[] = [
  {
    slug: 'best-time-douro-river-cruise-porto',
    title: 'The Best Time for a Douro River Cruise in Porto',
    excerpt:
      'Month by month and hour by hour — when the river looks its best, when the light works in your favour, and what to expect on board through the seasons.',
    seoTitle: 'Best Time for a Douro River Cruise in Porto (Month by Month)',
    seoDescription:
      'When to take a Douro River cruise in Porto: the best months, the best hour of the day, weather by season and how to pick between a day and a sunset departure.',
    keywords: 'best time Douro river cruise, Porto boat tour season, Porto weather cruise, when to visit Porto',
    cover: { file: 'ribeira-view.png', alt: 'The Ribeira seen from the Douro river' },
    category: 'guides',
    related: 'day-cruise',
    publishedAt: '2026-07-10',
    body: `
There is no wrong month to be on the Douro, but there is a right one for what you want out of it. Here is how the year looks from the water, from people who are out on it most days.

## The short answer

If you want the widest choice of departure times and the warmest evenings, come between **May and September**. If you want the river mostly to yourself and the light photographers talk about, come in **April, early May, or October**.

## Spring: April to June

The river runs high after the winter rains and the banks are green in a way they will not be again until next year. Mornings can start grey and clear by midday. Temperatures sit comfortably between 16°C and 24°C, which is close to ideal for two hours on deck.

This is also when the terraces along Ribeira start filling again, so the city has energy without the density of August. Bring a light jacket for the evening departures — once the sun drops behind the river mouth, the air cools quickly on the water.

## Summer: July to August

The busiest stretch, and for good reason: long daylight, reliable weather, and the sunset arriving late enough that a 19:00 departure lands squarely in golden hour.

A few practical notes for these months:

- The deck gets direct sun in the middle of the day. Our canopies cover most of the seating, but a hat and sunscreen are still worth bringing.
- Afternoon departures around 15:00 and 17:00 are usually the most comfortable, once the strongest heat has passed.
- Weekends fill first. If your dates are fixed, book earlier than you think you need to.

## Autumn: September to October

Many locals will tell you this is the best time in Porto, and they have a point. September holds summer temperatures with fewer people, and October brings a softer, lower light that makes the granite and the tiled façades look their best from the river.

Vintage season is under way upriver, and the city has a different rhythm — more workaday, less holiday.

## Winter: November to March

Shorter days and a real chance of rain, but also a Douro that very few visitors see: high water, dramatic skies, and the bridges in and out of cloud. Blankets on board earn their place. Departures are more weather-dependent in these months, which is why the reschedule-or-refund policy matters.

## Time of day matters more than the month

Across the whole year, the two most different experiences are:

- **Daytime (10:30 to 17:00)** — detail and colour. You see the tiles on the façades, the boats moored along Cais de Gaia, the mooring rings at the old Customs House. Best for photographs of the city itself.
- **Sunset (19:00 in season)** — light and atmosphere. Porto and Gaia change colour as you cross under Dom Luís I, and the whole hour has a different pace on board.

> If it is your first time on the Douro and you only have one slot, take the daytime departure. If you have seen the city already and want the hour that people remember, take the sunset.

## What we do when the weather turns

River, weather and safety conditions come first. If a departure cannot run safely, guests choose between rescheduling or a full refund — and we would rather make that call early than have you standing at the marina in the wind.

Whichever month you pick, the route stays the same: out from Douro Marina in Afurada, under Arrábida, past Massarelos and Alfândega, into the heart of Ribeira, under Dom Luís I for the photo moment, and back.
`,
  },
  {
    slug: 'porto-bridges-from-the-water',
    title: 'Porto’s Bridges from the Water: A Guide to All Six',
    excerpt:
      'Arrábida, Dom Luís I, Infante, Maria Pia, São João and Freixo — what each one is, who built it, and what to look for as you pass underneath.',
    seoTitle: 'Porto’s Six Bridges Explained: A Guide from the Douro River',
    seoDescription:
      'A guide to Porto’s six bridges — Arrábida, Dom Luís I, Infante, Maria Pia, São João and Freixo — seen from the Douro, with history and what to look for from the water.',
    keywords: 'Porto bridges, Dom Luis I bridge, Maria Pia bridge, Arrabida bridge, Porto boat tour bridges',
    cover: { file: 'ponte-luis.png', alt: 'Ponte D. Luís I seen from the Douro river' },
    category: 'guides',
    related: 'day-cruise',
    publishedAt: '2026-07-14',
    body: `
Porto is a city of bridges, and the only place you see all of them properly is from the middle of the river. Here is what you are looking at, going upstream from the river mouth.

## Ponte da Arrábida (1963)

The first one you pass leaving Douro Marina. When it opened, its 270-metre concrete arch was the longest of its kind in the world — an engineering statement by Edgar Cardoso, who wanted to prove what reinforced concrete could do.

From the water you get the scale of it in a way you never do driving across. Look up as you pass beneath: the arch springs from the rock on both banks with almost nothing in between.

## Ponte Dom Luís I (1886)

The one on the postcards, and the reason most people bring a camera. Two decks, a wrought-iron arch, and a design by Téophile Seyrig — who had worked with Gustave Eiffel on the bridge just upriver.

This is where we pause for the photo moment. The upper deck carries the metro and pedestrians; the lower deck carries traffic and the walk between Ribeira and the Gaia waterfront. From below, the lattice work reads as a single continuous curve.

## Ponte do Infante (2003)

The newest of the central bridges, and deliberately understated — a single concrete arch designed to sit quietly beside its famous neighbours rather than compete with them. Easy to miss if nobody points it out.

## Ponte de Dona Maria Pia (1877)

Eiffel’s bridge, and the oldest still standing. Built for the railway, retired in 1991, and left in place because taking it down was unthinkable. It has a lightness the others do not — all iron lattice, almost transparent against the sky.

Named for Queen Maria Pia of Savoy. Look for the difference in the ironwork between this and Dom Luís I: the same visual language, nine years apart, by two engineers who had worked together.

## Ponte de São João (1991)

The bridge that replaced Maria Pia for rail traffic. Three concrete spans, no ornament, built to carry high-speed trains. It sits directly beside the older bridge, which makes the contrast between 1877 and 1991 unusually easy to read.

## Ponte do Freixo (1995)

The furthest upstream of the six, carrying the ring road. On most departures we turn back before reaching it, but on a clear day you can see it from the water.

## What to look for between the bridges

The bridges are the landmarks, but the stretches between them hold the details:

- **Massarelos** — the church on the hill and the former fishing and fish-market area below it.
- **Jardins do Palácio de Cristal** — the gardens on the ridge, best seen from the water where the terracing makes sense.
- **Alfândega** — Porto’s old Customs House, with historic mooring rings still set into the stone beside the water.
- **Cais de Gaia** — the rabelo boats moored in front of the wine cellars, on the Vila Nova de Gaia bank.

## Seeing them yourself

Every one of our departures passes Arrábida, Dom Luís I, Maria Pia and São João, with a dedicated stop under Dom Luís I for photographs. The route may vary depending on river, weather and safety conditions — but the bridges are not going anywhere.
`,
  },
  {
    slug: 'what-is-porto-tonic',
    title: 'What Is Porto Tonic? Portugal’s Own Aperitif',
    excerpt:
      'White Port, tonic water, ice and a twist. How the drink is made, why it works, and where it fits in the Portuguese day.',
    seoTitle: 'What Is Porto Tonic? The Portuguese White Port Aperitif Explained',
    seoDescription:
      'Porto Tonic is white Port with tonic water over ice — Portugal’s summer aperitif. How it is made, which Port to use, and how it is served in Porto and Gaia.',
    keywords: 'Porto Tonic, white port tonic, Portuguese aperitif, what to drink in Porto, port wine cocktail',
    cover: { file: 'wine-deck.png', alt: 'A glass of white Port on the teak deck at golden hour' },
    category: 'onboard',
    related: 'sunset-cruise',
    publishedAt: '2026-07-16',
    body: `
Ask for a Porto Tonic anywhere between the Ribeira and Matosinhos on a warm evening and nobody will ask you what you mean. It is the drink of the Portuguese summer, and it is the one we hand you as you sit down on board.

## What is actually in it

Three things, and the proportions matter more than the brands:

- **White Port** — one part
- **Tonic water** — two parts
- **Ice** — a full glass of it, not two cubes

A strip of lemon or orange peel, and a sprig of mint if it is around. That is the whole recipe.

## Why white Port and not the red

Most people outside Portugal only meet Port as a dark, sweet after-dinner wine. White Port is the other half of the story — made from white grapes, aged in a way that keeps it fresher, and served cold as an **aperitif** rather than a digestif.

Look for a *branco seco* or *extra seco* if you want the drier end. The sweeter styles work too, but the drink tips towards dessert.

## The technique nobody mentions

Fill the glass with ice before anything else. A half-empty glass of ice melts fast, dilutes the drink and warms it — which is exactly what you do not want on a boat in July. Pour the Port over the ice, add the tonic slowly down the side of the glass to keep the bubbles, and stir once.

> Cold, dry, and not too strong. It is designed to be the drink you have before the evening starts, not the one that ends it.

## Where the drink comes from

Port houses in Vila Nova de Gaia have been pushing white Port as a long drink since the 1970s, partly to find a use for a style that was losing ground to the reds. It worked. Two generations later it is simply what people drink on a terrace in summer, and the origin story has been forgotten by almost everyone drinking it.

## What we serve on board

Every Douro Wonders departure includes a welcome Porto Tonic, with water or juice as a non-alcoholic alternative. Alongside it there are selected drinks and carefully chosen local flavours — small Portuguese bites rather than a full meal.

We pour the first one as you leave the marina, which means you are usually holding it as you pass under Arrábida. That is deliberate.
`,
  },
  {
    slug: 'afurada-fishing-village-porto',
    title: 'Afurada: The Fishing Village Across the River from Porto',
    excerpt:
      'Grilled fish, a communal washhouse still in daily use, and the quietest waterfront in the metropolitan area — ten minutes from Porto and largely unbothered by it.',
    seoTitle: 'Afurada, Vila Nova de Gaia: What to See, Eat and Do',
    seoDescription:
      'A guide to Afurada in Vila Nova de Gaia — the fishing village across the Douro from Porto. Grilled fish, the lavadouro, the marina and how to get there.',
    keywords: 'Afurada, Vila Nova de Gaia, Afurada restaurants, Douro Marina, things to do near Porto',
    cover: { file: 'felgueiras-lighthouse.png', alt: 'The lighthouse near the mouth of the Douro' },
    category: 'local',
    related: 'day-cruise',
    publishedAt: '2026-07-18',
    body: `
Our departures leave from Douro Marina in Afurada, which means most guests arrive with half an hour to spare in a place they had never heard of. That is a good problem to have.

## What Afurada is

A working fishing village on the Gaia bank of the Douro, close to where the river meets the Atlantic. It has been here far longer than the marina, and it has held onto its shape: narrow streets of low houses, boats pulled up on the sand, and a waterfront that faces Porto without trying to imitate it.

Administratively it is São Pedro da Afurada, part of Vila Nova de Gaia. In practice it functions as its own small town.

## The lavadouro

The village’s communal washhouse is still in daily use — one of very few left in the country that has not become a museum. Women bring laundry, wash it in the stone tanks, and hang it on the lines above. You will smell the soap before you see it.

It is worth a look, and worth being unobtrusive about it. People are doing their washing, not performing.

## Eating here

Afurada is known across the region for grilled fish, and the method is unchanged: charcoal grills set up on the street outside the restaurants, sardines and sea bass and whatever came in that morning, salt, olive oil, potatoes. Smoke over the whole street by one o’clock.

A few notes:

- **Lunch is the main event.** Many places are busiest between 12:30 and 14:30.
- **Go with what is on the grill**, not what is on the menu.
- It is informal. Paper tablecloths, house wine, no ceremony.

## Getting there

- **By car** — around 15 minutes from central Porto. There is parking at the marina.
- **By ferry** — a small passenger boat crosses from the Porto side at Cantareira, which is the pleasant way to arrive.
- **By bus** — the 93 from Porto runs to the village.

## Where we come into it

Douro Marina sits at the edge of the village, and our meeting point is Gate B. We ask guests to arrive ten minutes before departure, which is enough to find us without rushing — and if you come thirty minutes early, the waterfront and the lavadouro are a short walk away.

Full address: **Douro Marina, Rua da Praia 430, Gate B, 4400-354 Vila Nova de Gaia**.
`,
  },
  {
    slug: 'shared-or-private-boat-tour-porto',
    title: 'Shared or Private Boat Tour in Porto: How to Choose',
    excerpt:
      'The honest comparison — what changes between joining a small group and taking the whole boat, and which one suits the trip you are actually planning.',
    seoTitle: 'Shared vs Private Boat Tour in Porto: Which Should You Book?',
    seoDescription:
      'Shared or private boat tour on the Douro in Porto? A clear comparison of price, group size, timing and flexibility to help you choose the right one.',
    keywords:
      'private boat tour Porto, shared boat tour Porto, Douro river cruise private, small group boat Porto, boat rental Porto',
    cover: { file: 'bow-sunset.png', alt: 'The bow of the boat facing Ponte D. Luís I at sunset' },
    category: 'guides',
    related: 'day-cruise',
    publishedAt: '2026-07-20',
    body: `
We run both, and we have no preference which one you book. What follows is the comparison we would give a friend.

## The practical difference

On a **shared cruise** you buy a seat. You are on board with up to twelve people, at a fixed departure time, at a per-person price. On a **private cruise** you book the boat itself — same route, same hosts, same drinks — for your group alone, at a price per boat.

That is the whole difference. The route, the welcome Porto Tonic, the local flavours, the skipper and host, the blankets and the insurance are identical.

## When the shared cruise is the better call

- **You are one or two people.** The maths is straightforward.
- **You want to meet people.** Small groups on a boat talk to each other; it is one of the reasons we cap it at twelve.
- **Your plans are loose.** More departure times means more chance one fits your afternoon.

## When the private cruise is the better call

- **You are a group of six or more.** Around this size the per-person cost converges, and you get the boat to yourselves.
- **The occasion is the point.** Birthdays, proposals, anniversaries, a team moment at the end of a work trip.
- **You want the pace to be yours.** Nobody else’s schedule, nobody else’s conversation.
- **You are travelling with children or older relatives** and want the flexibility that comes with a group that is entirely your own.

## A quick way to decide

Take the private price and divide it by the number of people in your group. If the result is close to the per-person shared price, book private — you get the same experience with more control for roughly the same outlay. If it is well above, book shared and spend the difference on dinner in Ribeira.

## What we can and cannot arrange

Private bookings open the door to extras: a photographer, a musician, flowers, a cake, specific wines, particular local food. None of that is a fixed package on this website on purpose — what is possible depends on the date, the group and the notice we have.

> For special occasions or custom details, speak with us before booking. We’ll tell you what’s possible.

## Both options, both experiences

Day Cruise and Sunset Cruise are each available as a shared seat or as the whole boat. Free cancellation applies up to 24 hours before either way.
`,
  },
  {
    slug: 'where-to-watch-sunset-porto',
    title: 'Where to Watch the Sunset in Porto',
    excerpt:
      'Six places the light actually works — from the Jardim do Morro to the river mouth — with the honest trade-offs of each, and what changes when you watch from the water.',
    seoTitle: 'Where to Watch the Sunset in Porto: 6 Spots Locals Use',
    seoDescription:
      'The best places to watch the sunset in Porto — Jardim do Morro, Miradouro da Vitória, Foz, Serra do Pilar and from the Douro itself. With timings and trade-offs.',
    keywords:
      'sunset Porto, best sunset spots Porto, Jardim do Morro, Porto viewpoints, sunset cruise Porto, miradouro Porto',
    cover: { file: 'lighthouse-sunset.png', alt: 'Golden hour at the mouth of the Douro' },
    category: 'local',
    related: 'sunset-cruise',
    publishedAt: '2026-07-22',
    body: `
Porto faces west into the Atlantic, which means the city gets a proper sunset almost every clear evening. Here is where to be for it.

## Jardim do Morro

The obvious one, and it earns it. A grass slope on the Gaia side, directly at the top of the Dom Luís I upper deck, looking straight back at Porto with the bridge in the foreground.

**Trade-off:** everyone knows. By summer evenings it is busy, sociable and loud, with buskers. Great if that is the mood you want; less so if it is not.

## Miradouro da Serra do Pilar

Ten minutes uphill from Jardim do Morro and a completely different proposition. Higher, wider, and quieter — the classic view of the whole river bend with the bridge below you.

**Trade-off:** the climb, and the sun sets behind the city rather than beside it, so the light is on Porto rather than on you.

## Miradouro da Vitória

A small terrace in the middle of the old town, tucked behind the Jewish quarter. Rooftops, the cathedral, the river beyond. Locals more than visitors.

**Trade-off:** you are looking over a foreground of buildings, not water.

## Foz do Douro

Where the river meets the ocean. The sun goes down into the Atlantic with nothing in the way, and the Felgueiras lighthouse on the pier takes the waves.

**Trade-off:** it is a 20-minute tram or bus ride from the centre, and it is properly windy most evenings. Bring a layer.

## Passeio Alegre and the Afurada bank

The Gaia side near the river mouth is the version of Foz with a fraction of the people — palm trees, a low wall, the water in front of you. This is a short walk from Douro Marina.

## From the river itself

The difference from the water is not the sun. It is everything the sun is landing on: Ribeira, the Gaia cellars, Dom Luís I and the granite all changing colour at once, while you move slowly through the middle of it.

You also get the thing no viewpoint offers — the view keeps changing. From the marina you look west into the light; by the time you are under Dom Luís I you are looking back east at a city lit orange.

## Timing it

Sunset in Porto runs from roughly 18:00 in December to nearly 21:30 in late June. The useful rule: **the half hour before the sun goes down is the one worth planning around**, not the moment itself.

Our Sunset Cruise departs at 19:00 and runs two hours, which puts golden hour squarely in the middle of the route rather than at the end of it. Selected drinks and local flavours on board, blankets when the air cools.
`,
  },
]

async function run() {
  const payload = await getPayload({ config })

  const upload = async (file: string, alt: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    if (existing.docs[0]) return existing.docs[0].id
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath: img(file) })
    return doc.id
  }

  const expIds: Record<string, number> = {}
  for (const slug of ['day-cruise', 'sunset-cruise']) {
    const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1 })
    if (res.docs[0]) expIds[slug] = res.docs[0].id as number
  }

  for (const a of articles) {
    const coverId = await upload(a.cover.file, a.cover.alt)
    const data = {
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      coverImage: coverId,
      content: md(a.body),
      status: 'published' as const,
      publishedAt: new Date(a.publishedAt).toISOString(),
      category: a.category,
      author: 'Douro Wonders',
      readingMinutes: readingMinutes(a.body),
      relatedExperience: a.related ? expIds[a.related] : undefined,
      seoTitle: a.seoTitle,
      seoDescription: a.seoDescription,
      keywords: a.keywords,
    }

    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: a.slug } }, limit: 1 })
    if (existing.docs[0]) {
      await payload.update({ collection: 'posts', id: existing.docs[0].id, data, locale: 'en' })
      payload.logger.info(`Updated post: ${a.slug}`)
    } else {
      await payload.create({ collection: 'posts', data, locale: 'en' })
      payload.logger.info(`Created post: ${a.slug}`)
    }
  }

  payload.logger.info('Blog seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
