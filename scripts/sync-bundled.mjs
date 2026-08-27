// scripts/sync-production-2026-08-27.ts
import { getPayload } from "payload";

// src/payload.config.ts
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

// src/collections/Users.ts
var Users = {
  slug: "users",
  admin: {
    useAsTitle: "email"
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
  versions: false
};

// src/collections/Media.ts
var Media = {
  slug: "media",
  access: {
    read: () => true
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true
    }
  ],
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "card", width: 900, height: 675, position: "centre" },
      { name: "wide", width: 1800 }
    ],
    mimeTypes: ["image/*"]
  }
};

// src/collections/Experiences.ts
var Experiences = {
  slug: "experiences",
  labels: { singular: "Experience", plural: "Experiences" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "duration", "slug"],
    description: "The cruise experiences sold on the website. Each experience has a shared (per person) and a private (whole boat) rate \u2014 matching the B\xF3kun structure."
  },
  access: {
    read: () => true
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: 'URL path, e.g. "day-cruise". Stays the same in every language.' }
    },
    {
      name: "subtitle",
      type: "text",
      localized: true,
      admin: { description: 'e.g. "Porto: Small-Group Douro River Day Cruise"' }
    },
    { name: "duration", type: "text", required: true, localized: true, admin: { description: 'e.g. "90 minutes"' } },
    {
      name: "schedule",
      type: "array",
      labels: { singular: "Departure time", plural: "Departure times" },
      fields: [{ name: "time", type: "text", required: true }]
    },
    {
      name: "shared",
      type: "group",
      label: "Shared rate (per person, up to 12)",
      fields: [
        { name: "referencePrice", type: "number", admin: { description: "Reference price in \u20AC per person" } },
        { name: "launchPrice", type: "number", required: true, admin: { description: "Launch price in \u20AC per person" } },
        { name: "shortCopy", type: "textarea", required: true, localized: true },
        { name: "ctaLabel", type: "text", required: true, localized: true, admin: { description: 'e.g. "Book Day Cruise"' } }
      ]
    },
    {
      name: "private",
      type: "group",
      label: "Private rate (whole boat)",
      fields: [
        { name: "launchPrice", type: "number", required: true, admin: { description: "Launch price in \u20AC per boat" } },
        { name: "subtitle", type: "text", localized: true, admin: { description: 'e.g. "Private Douro Day Cruise"' } },
        { name: "shortCopy", type: "textarea", required: true, localized: true },
        { name: "ctaLabel", type: "text", required: true, localized: true, admin: { description: 'e.g. "Book Private Day Cruise"' } }
      ]
    },
    {
      name: "bokun",
      type: "group",
      label: "B\xF3kun booking",
      fields: [
        {
          name: "widgetSrc",
          type: "text",
          admin: {
            description: "The data-src URL of the B\xF3kun calendar widget for this experience, e.g. https://widgets.bokun.io/online-sales/\u2026/experience-calendar/1249232"
          }
        }
      ]
    },
    {
      name: "details",
      type: "group",
      label: "Detail page content",
      fields: [
        {
          name: "languages",
          type: "text",
          localized: true,
          admin: { description: 'e.g. "English, French, Portuguese, Spanish, German"' }
        },
        {
          name: "highlights",
          type: "array",
          localized: true,
          fields: [{ name: "text", type: "text", required: true }]
        },
        {
          name: "fullDescription",
          type: "textarea",
          localized: true,
          admin: { description: "Long description. Blank lines create paragraphs." }
        },
        {
          name: "itinerary",
          type: "array",
          localized: true,
          fields: [
            { name: "stop", type: "text", required: true },
            { name: "note", type: "text", admin: { description: 'e.g. "Photo stop, Scenic views on the way"' } }
          ]
        },
        {
          name: "includes",
          type: "array",
          localized: true,
          fields: [{ name: "item", type: "text", required: true }]
        },
        {
          name: "notSuitableFor",
          type: "array",
          localized: true,
          fields: [{ name: "item", type: "text", required: true }]
        },
        {
          name: "notAllowed",
          type: "array",
          localized: true,
          fields: [{ name: "item", type: "text", required: true }]
        },
        {
          name: "knowBeforeYouGo",
          type: "array",
          localized: true,
          fields: [{ name: "item", type: "text", required: true }]
        }
      ]
    },
    { name: "image", type: "upload", relationTo: "media", admin: { description: "Main image (hero + homepage card)" } },
    { name: "imagePrivate", type: "upload", relationTo: "media", admin: { description: "Image for the private-rate card" } },
    {
      name: "gallery",
      type: "array",
      label: "Photo gallery",
      labels: { singular: "Photo", plural: "Photos" },
      admin: { description: "Shown as a gallery on this experience\u2019s detail page." },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "caption", type: "text", localized: true }
      ]
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Sort order on the homepage (lowest first)" }
    }
  ]
};

// src/collections/FAQs.ts
var FAQs = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
    description: "Practical booking questions shown on the website."
  },
  access: {
    read: () => true
  },
  fields: [
    { name: "question", type: "text", required: true, localized: true },
    { name: "answer", type: "textarea", required: true, localized: true },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Sort order within its section (lowest first)" } },
    {
      name: "section",
      type: "select",
      defaultValue: "booking",
      options: [
        { label: "Booking & the cruise", value: "booking" },
        { label: "Meeting point", value: "meeting-point" },
        { label: "Getting here", value: "getting-here" },
        { label: "Onboard", value: "onboard" },
        { label: "Guests & accessibility", value: "guests" },
        { label: "Weather & seasonality", value: "weather" }
      ],
      admin: { description: "Groups this question under a heading on the FAQ page." }
    }
  ]
};

// src/collections/Posts.ts
var Posts = {
  slug: "posts",
  labels: { singular: "Blog Post", plural: "Blog Posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "status"],
    description: "Guides and stories about the Douro, Porto and life on the river. Good content here is what brings people to the site from Google."
  },
  access: {
    read: () => true
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "title", type: "text", required: true, localized: true },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              admin: { description: 'URL path, e.g. "best-time-douro-river-cruise". Same across all languages.' }
            },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              localized: true,
              admin: { description: "One or two sentences shown on the blog index and in Google results." }
            },
            { name: "coverImage", type: "upload", relationTo: "media" },
            { name: "content", type: "richText", localized: true }
          ]
        },
        {
          label: "Publishing",
          fields: [
            {
              name: "status",
              type: "select",
              defaultValue: "published",
              options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" }
              ]
            },
            { name: "publishedAt", type: "date", admin: { date: { pickerAppearance: "dayOnly" } } },
            {
              name: "category",
              type: "select",
              defaultValue: "guides",
              options: [
                { label: "Porto & Douro Guides", value: "guides" },
                { label: "On Board", value: "onboard" },
                { label: "Local Knowledge", value: "local" },
                { label: "News", value: "news" }
              ]
            },
            { name: "author", type: "text", defaultValue: "Douro Wonders" },
            {
              name: "readingMinutes",
              type: "number",
              admin: { description: "Estimated reading time in minutes. Leave empty to hide." }
            },
            {
              name: "relatedExperience",
              type: "relationship",
              relationTo: "experiences",
              admin: { description: "Shown as a booking call-to-action at the end of the article." }
            }
          ]
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seoTitle",
              type: "text",
              localized: true,
              admin: { description: "Overrides the page title in Google. Aim for under 60 characters." }
            },
            {
              name: "seoDescription",
              type: "textarea",
              localized: true,
              admin: { description: "Meta description. Aim for 150\u2013160 characters." }
            },
            {
              name: "keywords",
              type: "text",
              localized: true,
              admin: { description: "Comma-separated focus keywords for this article." }
            }
          ]
        }
      ]
    }
  ]
};

// src/collections/ContactMessages.ts
var ContactMessages = {
  slug: "contact-messages",
  labels: { singular: "Contact Message", plural: "Contact Messages" },
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["subject", "name", "email", "createdAt"],
    description: "Messages sent through the website contact form."
  },
  access: {
    create: () => true,
    // public form submissions
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user)
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Replied", value: "replied" },
        { label: "Closed", value: "closed" }
      ],
      admin: { position: "sidebar" }
    }
  ]
};

// src/globals/SiteSettings.ts
var SiteSettings = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true
  },
  fields: [
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "description", type: "textarea", required: true, localized: true }
      ]
    },
    { name: "email", type: "text", required: true },
    {
      name: "formEndpoint",
      type: "text",
      label: "Contact form endpoint (not in use)",
      admin: {
        description: "Superseded \u2014 the contact form now sends through the transactional email API configured on the server. Messages arrive by email and are always saved under Contact Messages."
      }
    },
    {
      name: "whatsapp",
      type: "text",
      admin: { description: 'WhatsApp number in international format, e.g. "+351 918 030 672"' }
    },
    {
      name: "phones",
      type: "array",
      labels: { singular: "Phone", plural: "Phones" },
      fields: [
        { name: "label", type: "text", admin: { description: 'e.g. "Ant\xF3nio" or "Bookings"' } },
        { name: "number", type: "text", required: true, admin: { description: 'e.g. "+351 918 030 672"' } }
      ]
    },
    {
      name: "meetingPoint",
      type: "group",
      fields: [
        { name: "name", type: "text", admin: { description: 'e.g. "Douro Marina | Afurada"' } },
        { name: "addressLines", type: "array", fields: [{ name: "line", type: "text", required: true }] },
        { name: "arrivalNote", type: "text", localized: true },
        { name: "mapsUrl", type: "text", admin: { description: "Google Maps directions link" } }
      ]
    },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "instagram", type: "text" },
        { name: "facebook", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "google", type: "text" }
      ]
    },
    {
      name: "bokun",
      type: "group",
      fields: [
        {
          name: "bookingChannelUUID",
          type: "text",
          admin: { description: "B\xF3kun booking channel UUID used to load the widget script." }
        }
      ]
    },
    {
      name: "cancellationPolicy",
      type: "textarea",
      localized: true,
      admin: { description: "Shown on the cancellation policy page and FAQ area." }
    },
    {
      name: "legal",
      type: "group",
      fields: [
        { name: "companyName", type: "text" },
        { name: "rnaat", type: "text", admin: { description: 'RNAAT registration number, e.g. "RNAAT 88/2002"' } },
        { name: "livroReclamacoesUrl", type: "text", admin: { description: "Livro de Reclama\xE7\xF5es link (or leave empty for placeholder)." } }
      ]
    }
  ]
};

// src/globals/Homepage.ts
var t = (field) => ({ ...field, localized: true });
var Homepage = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    description: "Edit the homepage section by section. Each tab matches a block on the live page, top to bottom. Use the language selector to translate."
  },
  access: {
    read: () => true
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 \xB7 Hero",
          description: "Top of the page \u2014 headline, subheadline, buttons and the rotating photo.",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                t({ name: "headline", type: "text", required: true }),
                t({ name: "subheadline", type: "textarea", required: true }),
                t({ name: "primaryCta", type: "text", required: true }),
                t({ name: "secondaryCta", type: "text", required: true }),
                t({ name: "mobileStickyCta", type: "text", required: true }),
                { name: "image", type: "upload", relationTo: "media", admin: { description: "First / main hero photo." } }
              ]
            }
          ]
        },
        {
          label: "2 \xB7 Launch Offer",
          description: "The announcement bar and the launch-offer band. Turn it off when the offer ends.",
          fields: [
            {
              name: "campaign",
              type: "group",
              label: "Launch campaign",
              fields: [
                {
                  name: "active",
                  type: "checkbox",
                  defaultValue: true,
                  admin: { description: "Turn off when the launch offer ends \u2014 the top banner and offer band disappear." }
                },
                t({
                  name: "badgeText",
                  type: "textarea",
                  admin: { description: "Shown in the top announcement bar and the offer band." }
                }),
                t({ name: "offerTitle", type: "text" }),
                t({ name: "offerBody", type: "textarea" })
              ]
            }
          ]
        },
        {
          label: "3 \xB7 Experiences",
          description: "Headings for the experiences section. The cards come from the Experiences collection.",
          fields: [
            {
              name: "experiencesSection",
              type: "group",
              label: "Experiences section",
              fields: [
                t({ name: "title", type: "text", admin: { description: 'e.g. "Choose your Douro experience"' } }),
                t({ name: "lead", type: "textarea" }),
                t({ name: "sharedLabel", type: "text", admin: { description: 'e.g. "Shared Cruises"' } }),
                t({ name: "sharedTag", type: "text" }),
                t({ name: "privateLabel", type: "text", admin: { description: 'e.g. "Private Cruises"' } }),
                t({ name: "privateTag", type: "text" })
              ]
            }
          ]
        },
        {
          label: "4 \xB7 Route",
          description: "The interactive route map \u2014 stops, heading and note.",
          fields: [
            {
              name: "route",
              type: "group",
              fields: [
                t({ name: "title", type: "text", admin: { description: 'e.g. "From the marina to the bridges"' } }),
                t({ name: "lead", type: "textarea" }),
                t({
                  name: "stops",
                  type: "array",
                  labels: { singular: "Stop", plural: "Stops" },
                  fields: [{ name: "stop", type: "text", required: true }]
                }),
                t({ name: "note", type: "text", admin: { description: "Mandatory route-variation note." } }),
                { name: "image", type: "upload", relationTo: "media" }
              ]
            }
          ]
        },
        {
          label: "5 \xB7 The Boat",
          description: "Photo, description, specs and gallery of the boat.",
          fields: [
            {
              name: "boat",
              type: "group",
              label: "The Boat",
              fields: [
                t({ name: "headline", type: "text" }),
                t({ name: "body", type: "textarea" }),
                t({
                  name: "specs",
                  type: "array",
                  labels: { singular: "Spec", plural: "Specs" },
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "value", type: "text", required: true }
                  ]
                }),
                { name: "image", type: "upload", relationTo: "media" },
                {
                  name: "gallery",
                  type: "array",
                  labels: { singular: "Photo", plural: "Photos" },
                  fields: [{ name: "image", type: "upload", relationTo: "media", required: true }]
                }
              ]
            }
          ]
        },
        {
          label: "6 \xB7 Included",
          description: `The "What's included" list.`,
          fields: [
            {
              name: "included",
              type: "group",
              label: "What's included",
              fields: [
                t({ name: "title", type: "text", admin: { description: 'e.g. "What\u2019s included"' } }),
                t({
                  name: "intro",
                  type: "textarea",
                  admin: { description: "One-sentence version shown under the heading." }
                }),
                t({
                  name: "items",
                  type: "array",
                  labels: { singular: "Item", plural: "Items" },
                  fields: [{ name: "item", type: "text", required: true }]
                })
              ]
            }
          ]
        },
        {
          label: "7 \xB7 Boutique",
          description: "The Onboard Boutique band.",
          fields: [
            {
              name: "boutique",
              type: "group",
              label: "Onboard Boutique",
              fields: [
                t({ name: "headline", type: "text" }),
                t({ name: "body", type: "textarea" }),
                { name: "image", type: "upload", relationTo: "media" }
              ]
            }
          ]
        },
        {
          label: "8 \xB7 About / Founders",
          description: "Intro plus the In\xEAs and Ant\xF3nio feature rows.",
          fields: [
            {
              name: "founders",
              type: "group",
              fields: [
                t({ name: "headline", type: "text" }),
                t({ name: "body", type: "textarea" }),
                { name: "image", type: "upload", relationTo: "media", admin: { description: "The two of them together." } },
                {
                  name: "ines",
                  type: "group",
                  label: "In\xEAs",
                  fields: [
                    { name: "name", type: "text" },
                    t({ name: "role", type: "text" }),
                    t({ name: "bio", type: "textarea" }),
                    { name: "photo", type: "upload", relationTo: "media" }
                  ]
                },
                {
                  name: "antonio",
                  type: "group",
                  label: "Ant\xF3nio",
                  fields: [
                    { name: "name", type: "text" },
                    t({ name: "role", type: "text" }),
                    t({ name: "bio", type: "textarea" }),
                    { name: "photo", type: "upload", relationTo: "media" }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "9 \xB7 FAQ",
          description: "Heading for the FAQ section. The questions themselves live in the FAQs collection.",
          fields: [
            {
              name: "faqSection",
              type: "group",
              label: "FAQ section",
              fields: [
                t({ name: "title", type: "text", admin: { description: 'e.g. "Frequently asked questions"' } }),
                t({ name: "lead", type: "textarea" })
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/globals/SpecialOccasions.ts
var SpecialOccasions = {
  slug: "special-occasions",
  label: "Special Occasions Page",
  access: {
    read: () => true
  },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true },
    { name: "intro", type: "textarea", localized: true },
    {
      name: "ideas",
      type: "array",
      localized: true,
      labels: { singular: "Idea", plural: "Ideas" },
      admin: { description: 'Short list of occasion ideas shown as bullets, e.g. "Marriage proposals".' },
      fields: [{ name: "text", type: "text", required: true }]
    },
    { name: "image", type: "upload", relationTo: "media" }
  ]
};

// src/payload.config.ts
var filename = fileURLToPath(import.meta.url);
var dirname = path.dirname(filename);
var payload_config_default = buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    meta: {
      titleSuffix: " \xB7 Douro Wonders Admin"
    }
  },
  collections: [Experiences, FAQs, Posts, ContactMessages, Media, Users],
  globals: [Homepage, SiteSettings, SpecialOccasions],
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Portugu\xEAs", code: "pt" },
      { label: "Fran\xE7ais", code: "fr" },
      { label: "Espa\xF1ol", code: "es" },
      { label: "Deutsch", code: "de" }
    ],
    defaultLocale: "en",
    // Untranslated fields fall back to English, so nothing is ever blank.
    fallback: true
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db"
    }
  }),
  sharp
});

// scripts/sync-production-2026-08-27.ts
var payload = await getPayload({ config: payload_config_default });
var SECTION_BY_QUESTION = {
  "Where is the meeting point?": "meeting-point",
  "How early should I arrive?": "meeting-point",
  "What's included?": "booking",
  "Is food included?": "booking",
  "Are drinks included?": "booking",
  "What happens if weather or river conditions are unsafe?": "weather",
  "Can children join?": "guests",
  "Can I book the boat privately?": "booking",
  "Can I request extras for a special occasion?": "booking",
  "Are pets allowed?": "guests",
  "Is the route always the same?": "booking"
};
var CHILDREN_ANSWER = {
  pt: "Sim, as fam\xEDlias s\xE3o bem-vindas. Todos os h\xF3spedes, incluindo beb\xE9s, t\xEAm de estar inclu\xEDdos na reserva e contam para a capacidade m\xE1xima.",
  en: "Yes, families are welcome. All guests, including infants, must be included in the booking and count towards maximum capacity.",
  fr: "Oui, les familles sont les bienvenues. Tous les invit\xE9s, y compris les b\xE9b\xE9s, doivent \xEAtre inclus dans la r\xE9servation et comptent dans la capacit\xE9 maximale.",
  es: "S\xED, las familias son bienvenidas. Todos los hu\xE9spedes, incluidos los beb\xE9s, deben incluirse en la reserva y cuentan para la capacidad m\xE1xima.",
  de: "Ja, Familien sind willkommen. Alle G\xE4ste, einschlie\xDFlich Babys, m\xFCssen in der Buchung enthalten sein und z\xE4hlen zur maximalen Kapazit\xE4t."
};
var existing = await payload.find({ collection: "faqs", locale: "en", limit: 100 });
var matched = 0;
for (const doc of existing.docs) {
  const section = SECTION_BY_QUESTION[doc.question];
  if (!section) continue;
  await payload.update({ collection: "faqs", id: doc.id, data: { section } });
  matched++;
  if (doc.question === "Can children join?") {
    for (const [locale, answer] of Object.entries(CHILDREN_ANSWER)) {
      await payload.update({ collection: "faqs", id: doc.id, locale, data: { answer } });
    }
  }
}
console.log(`[faqs] sections assigned to ${matched}/${existing.docs.length} existing questions`);
var NEW_ENTRIES = [
  {
    section: "meeting-point",
    order: 3,
    pt: { q: "E se eu chegar atrasado?", a: "Os cruzeiros partem \xE0 hora marcada. Chegadas atrasadas n\xE3o podem atrasar a partida e n\xE3o t\xEAm direito a reembolso." },
    en: { q: "What if I arrive late?", a: "Cruises depart on time. Late arrivals cannot delay departure and are non-refundable." },
    fr: { q: "Que se passe-t-il si j'arrive en retard ?", a: "Les croisi\xE8res partent \xE0 l'heure pr\xE9vue. Les arriv\xE9es tardives ne peuvent pas retarder le d\xE9part et ne sont pas remboursables." },
    es: { q: "\xBFQu\xE9 pasa si llego tarde?", a: "Los cruceros salen a la hora prevista. Las llegadas tard\xEDas no pueden retrasar la salida y no son reembolsables." },
    de: { q: "Was passiert, wenn ich zu sp\xE4t komme?", a: "Die Fahrten starten p\xFCnktlich. Versp\xE4tete Ank\xFCnfte k\xF6nnen die Abfahrt nicht verz\xF6gern und werden nicht erstattet." }
  },
  {
    section: "getting-here",
    order: 1,
    pt: { q: "Como chego at\xE9 l\xE1?", a: "Procure por \xABDouro Wonders\xBB ou \xABDouro Marina Afurada\xBB no Google Maps e dirija-se ao Gate B. O tr\xE2nsito no Porto pode complicar-se nas horas de ponta, sobretudo ao final da tarde e perto do p\xF4r do sol \u2014 reserve um pouco mais de tempo." },
    en: { q: "How do I get there?", a: "Search for Douro Wonders or Douro Marina Afurada on Google Maps and head to Gate B. Porto traffic can be busy at peak hours, especially late afternoon and around sunset \u2014 please leave a little extra time." },
    fr: { q: "Comment s'y rendre ?", a: "Recherchez \xAB Douro Wonders \xBB ou \xAB Douro Marina Afurada \xBB sur Google Maps et dirigez-vous vers le Gate B. La circulation \xE0 Porto peut \xEAtre dense aux heures de pointe, surtout en fin d'apr\xE8s-midi et au coucher du soleil \u2014 pr\xE9voyez un peu de temps suppl\xE9mentaire." },
    es: { q: "\xBFC\xF3mo llego hasta all\xED?", a: "Busca \xABDouro Wonders\xBB o \xABDouro Marina Afurada\xBB en Google Maps y dir\xEDgete a la Gate B. El tr\xE1fico en Oporto puede complicarse en horas punta, sobre todo a \xFAltima hora de la tarde y cerca del atardecer \u2014 deja un poco m\xE1s de tiempo." },
    de: { q: "Wie komme ich dorthin?", a: 'Suchen Sie auf Google Maps nach \u201EDouro Wonders" oder \u201EDouro Marina Afurada" und gehen Sie zum Gate B. Der Verkehr in Porto kann zu Sto\xDFzeiten dicht sein, besonders am sp\xE4ten Nachmittag und bei Sonnenuntergang \u2014 planen Sie etwas mehr Zeit ein.' }
  },
  {
    section: "getting-here",
    order: 2,
    pt: { q: "Onde posso estacionar?", a: "Normalmente h\xE1 estacionamento p\xFAblico dispon\xEDvel na zona da marina. A disponibilidade varia com a \xE9poca e o dia \u2014 conte com uma pequena caminhada desde o seu lugar de estacionamento." },
    en: { q: "Where can I park?", a: "Public parking is usually available around the marina area. Availability varies with season and day \u2014 please plan for a short walk from your parking spot." },
    fr: { q: "O\xF9 puis-je me garer ?", a: "Un parking public est g\xE9n\xE9ralement disponible autour de la marina. La disponibilit\xE9 varie selon la saison et le jour \u2014 pr\xE9voyez une courte marche depuis votre place de stationnement." },
    es: { q: "\xBFD\xF3nde puedo aparcar?", a: "Normalmente hay aparcamiento p\xFAblico disponible en la zona de la marina. La disponibilidad var\xEDa seg\xFAn la temporada y el d\xEDa \u2014 cuenta con un peque\xF1o paseo desde tu plaza de aparcamiento." },
    de: { q: "Wo kann ich parken?", a: "Rund um die Marina ist in der Regel \xF6ffentliches Parken m\xF6glich. Die Verf\xFCgbarkeit variiert je nach Saison und Tag \u2014 planen Sie einen kurzen Fu\xDFweg von Ihrem Parkplatz ein." }
  },
  {
    section: "getting-here",
    order: 3,
    pt: { q: "Vou de t\xE1xi ou Uber \u2014 o que digo ao motorista?", a: "Pe\xE7a para o deixar na Douro Marina, Afurada. O ponto de largada fica perto da entrada da marina." },
    en: { q: "I'm arriving by taxi or rideshare \u2014 what do I tell the driver?", a: "Ask the driver for Douro Marina, Afurada. Drop-off is close to the marina entrance." },
    fr: { q: "Je viens en taxi ou en VTC \u2014 que dire au chauffeur ?", a: "Demandez \xE0 \xEAtre d\xE9pos\xE9 \xE0 Douro Marina, Afurada. La d\xE9pose se trouve pr\xE8s de l'entr\xE9e de la marina." },
    es: { q: "Llego en taxi o VTC \u2014 \xBFqu\xE9 le digo al conductor?", a: "Pide que te deje en Douro Marina, Afurada. El punto de bajada est\xE1 cerca de la entrada de la marina." },
    de: { q: "Ich komme mit dem Taxi oder Fahrdienst \u2014 was sage ich dem Fahrer?", a: "Bitten Sie um die Adresse Douro Marina, Afurada. Der Ausstiegspunkt liegt nahe am Eingang der Marina." }
  },
  {
    section: "onboard",
    order: 1,
    pt: { q: "O que devo vestir?", a: "Roupa em camadas confort\xE1veis, \xF3culos de sol e um casaco leve para a brisa do rio \u2014 mesmo no ver\xE3o, as partidas ao p\xF4r do sol podem ser mais frescas na \xE1gua. H\xE1 cobertores dispon\xEDveis a bordo caso sejam precisos." },
    en: { q: "What should I wear?", a: "Comfortable layers, sunglasses and a light jacket for the river breeze \u2014 even in summer, sunset departures can feel cooler on the water. Blankets are available onboard if needed." },
    fr: { q: "Que dois-je porter ?", a: "Des v\xEAtements confortables en couches, des lunettes de soleil et une veste l\xE9g\xE8re pour la brise du fleuve \u2014 m\xEAme en \xE9t\xE9, les d\xE9parts au coucher du soleil peuvent \xEAtre plus frais sur l'eau. Des couvertures sont disponibles \xE0 bord si besoin." },
    es: { q: "\xBFQu\xE9 debo ponerme?", a: "Ropa c\xF3moda por capas, gafas de sol y una chaqueta ligera para la brisa del r\xEDo \u2014 incluso en verano, las salidas al atardecer pueden sentirse m\xE1s frescas sobre el agua. Hay mantas disponibles a bordo si se necesitan." },
    de: { q: "Was soll ich anziehen?", a: "Bequeme Schichten, eine Sonnenbrille und eine leichte Jacke f\xFCr die Flussbrise \u2014 selbst im Sommer kann es bei Sonnenuntergangsfahrten auf dem Wasser k\xFChler sein. Bei Bedarf stehen Decken an Bord zur Verf\xFCgung." }
  },
  {
    section: "onboard",
    order: 2,
    pt: { q: "Mantenho os sapatos cal\xE7ados a bordo?", a: "Sim, os h\xF3spedes mant\xEAm os sapatos cal\xE7ados. Cal\xE7ado de sola macia \xE9 bem-vindo." },
    en: { q: "Do I keep my shoes on onboard?", a: "Yes, guests keep their shoes on. Soft-soled shoes are welcome." },
    fr: { q: "Dois-je garder mes chaussures \xE0 bord ?", a: "Oui, les invit\xE9s gardent leurs chaussures. Les chaussures \xE0 semelle souple sont les bienvenues." },
    es: { q: "\xBFMantengo los zapatos puestos a bordo?", a: "S\xED, los hu\xE9spedes mantienen el calzado puesto. Se recomienda calzado de suela blanda." },
    de: { q: "Behalte ich meine Schuhe an Bord an?", a: "Ja, G\xE4ste behalten ihre Schuhe an. Schuhe mit weicher Sohle sind willkommen." }
  },
  {
    section: "onboard",
    order: 3,
    pt: { q: "H\xE1 casa de banho a bordo?", a: "A embarca\xE7\xE3o n\xE3o tem casa de banho a bordo. Por favor, utilize as instala\xE7\xF5es da marina antes de embarcar." },
    en: { q: "Is there a toilet onboard?", a: "The vessel does not have onboard facilities. Please use the marina before boarding." },
    fr: { q: "Y a-t-il des toilettes \xE0 bord ?", a: "Le bateau ne dispose pas de toilettes \xE0 bord. Merci d'utiliser celles de la marina avant l'embarquement." },
    es: { q: "\xBFHay ba\xF1o a bordo?", a: "La embarcaci\xF3n no dispone de ba\xF1o a bordo. Por favor, utiliza las instalaciones de la marina antes de embarcar." },
    de: { q: "Gibt es eine Toilette an Bord?", a: "Das Boot verf\xFCgt nicht \xFCber eine Toilette an Bord. Bitte nutzen Sie die Einrichtungen der Marina vor dem Einsteigen." }
  },
  {
    section: "guests",
    order: 1,
    pt: { q: "Qual \xE9 a capacidade m\xE1xima?", a: "At\xE9 12 h\xF3spedes por cruzeiro, incluindo beb\xE9s." },
    en: { q: "What's the maximum capacity?", a: "Up to 12 guests per cruise, including infants." },
    fr: { q: "Quelle est la capacit\xE9 maximale ?", a: "Jusqu'\xE0 12 personnes par croisi\xE8re, b\xE9b\xE9s inclus." },
    es: { q: "\xBFCu\xE1l es la capacidad m\xE1xima?", a: "Hasta 12 personas por crucero, incluidos los beb\xE9s." },
    de: { q: "Wie hoch ist die maximale Kapazit\xE4t?", a: "Bis zu 12 G\xE4ste pro Fahrt, Babys eingeschlossen." }
  },
  {
    section: "guests",
    order: 4,
    pt: { q: "O barco \xE9 acess\xEDvel para pessoas com mobilidade reduzida?", a: "O embarque implica descer do pont\xE3o para a embarca\xE7\xE3o. H\xF3spedes com mobilidade reduzida s\xE3o bem-vindos \u2014 contacte-nos com anteced\xEAncia para o ajudarmos a planear a visita." },
    en: { q: "Is the boat accessible for guests with reduced mobility?", a: "Boarding requires stepping down from the pontoon onto the vessel. Guests with reduced mobility are welcome \u2014 please contact us in advance so we can help plan your visit." },
    fr: { q: "Le bateau est-il accessible aux personnes \xE0 mobilit\xE9 r\xE9duite ?", a: "L'embarquement implique de descendre du ponton vers le bateau. Les personnes \xE0 mobilit\xE9 r\xE9duite sont les bienvenues \u2014 contactez-nous \xE0 l'avance pour que nous puissions vous aider \xE0 planifier votre visite." },
    es: { q: "\xBFEl barco es accesible para personas con movilidad reducida?", a: "El embarque implica bajar del pantal\xE1n a la embarcaci\xF3n. Las personas con movilidad reducida son bienvenidas \u2014 cont\xE1ctanos con antelaci\xF3n para ayudarte a planificar la visita." },
    de: { q: "Ist das Boot f\xFCr G\xE4ste mit eingeschr\xE4nkter Mobilit\xE4t zug\xE4nglich?", a: "Beim Einsteigen muss man vom Steg auf das Boot hinuntersteigen. G\xE4ste mit eingeschr\xE4nkter Mobilit\xE4t sind willkommen \u2014 bitte kontaktieren Sie uns im Voraus, damit wir Ihren Besuch mitplanen k\xF6nnen." }
  },
  {
    section: "guests",
    order: 5,
    pt: { q: "Enjoo-me facilmente \u2014 o que aconselham?", a: "O rio \xE9 geralmente muito calmo. Se for particularmente sens\xEDvel, recomendamos tomar uma precau\xE7\xE3o ligeira antes de embarcar." },
    en: { q: "I get motion sick easily \u2014 any advice?", a: "The river is generally very smooth. If you are particularly sensitive, we recommend taking a light precaution before boarding." },
    fr: { q: "J'ai facilement le mal des transports \u2014 un conseil ?", a: "Le fleuve est g\xE9n\xE9ralement tr\xE8s calme. Si vous \xEAtes particuli\xE8rement sensible, nous recommandons de prendre une l\xE9g\xE8re pr\xE9caution avant l'embarquement." },
    es: { q: "Me mareo con facilidad \u2014 \xBFalg\xFAn consejo?", a: "El r\xEDo es generalmente muy tranquilo. Si eres especialmente sensible, recomendamos tomar una ligera precauci\xF3n antes de embarcar." },
    de: { q: "Ich werde leicht seekrank \u2014 haben Sie einen Tipp?", a: "Der Fluss ist in der Regel sehr ruhig. Wenn Sie besonders empfindlich sind, empfehlen wir eine leichte Vorsichtsma\xDFnahme vor dem Einsteigen." }
  },
  {
    section: "weather",
    order: 2,
    pt: { q: "O hor\xE1rio do Cruzeiro P\xF4r do Sol muda ao longo do ano?", a: "Sim, o hor\xE1rio de partida do Cruzeiro P\xF4r do Sol muda com a \xE9poca, para acompanhar a luz do fim de tarde." },
    en: { q: "Does the Sunset Cruise time change during the year?", a: "Yes, the Sunset Cruise departure time changes seasonally to follow the evening light." },
    fr: { q: "L'heure de la croisi\xE8re au coucher du soleil change-t-elle selon la saison ?", a: "Oui, l'heure de d\xE9part de la croisi\xE8re au coucher du soleil change selon la saison, pour suivre la lumi\xE8re du soir." },
    es: { q: "\xBFEl horario del Crucero Atardecer cambia seg\xFAn la \xE9poca del a\xF1o?", a: "S\xED, la hora de salida del Crucero Atardecer cambia seg\xFAn la temporada, para seguir la luz del atardecer." },
    de: { q: "\xC4ndert sich die Uhrzeit der Sunset Cruise im Jahresverlauf?", a: "Ja, die Abfahrtszeit der Sunset Cruise \xE4ndert sich saisonal, um dem Abendlicht zu folgen." }
  },
  {
    section: "weather",
    order: 3,
    pt: { q: "E se eu n\xE3o aparecer?", a: "As n\xE3o compar\xEAncias (no-shows) n\xE3o t\xEAm direito a reembolso." },
    en: { q: "What if I don't show up?", a: "No-shows are non-refundable." },
    fr: { q: "Que se passe-t-il si je ne me pr\xE9sente pas ?", a: "Les absences (no-shows) ne sont pas remboursables." },
    es: { q: "\xBFQu\xE9 pasa si no me presento?", a: "Las ausencias (no-shows) no son reembolsables." },
    de: { q: "Was passiert, wenn ich nicht erscheine?", a: "Nichterscheinen (No-Shows) wird nicht erstattet." }
  }
];
for (const entry of NEW_ENTRIES) {
  const already2 = await payload.find({ collection: "faqs", locale: "en", where: { question: { equals: entry.en.q } }, limit: 1 });
  if (already2.docs.length) {
    console.log(`[faqs] skip (exists): ${entry.en.q}`);
    continue;
  }
  const created = await payload.create({
    collection: "faqs",
    locale: "en",
    data: { question: entry.en.q, answer: entry.en.a, section: entry.section, order: entry.order }
  });
  for (const locale of ["pt", "fr", "es", "de"]) {
    await payload.update({ collection: "faqs", id: created.id, locale, data: { question: entry[locale].q, answer: entry[locale].a } });
  }
  console.log(`[faqs] created: ${entry.en.q}`);
}
var SEATING_VALUES = { pt: "Sof\xE1 em U", en: "U-shaped lounge", fr: "Banquette en U", es: "Sof\xE1 en U", de: "U-f\xF6rmige Sitzbank" };
for (const locale of ["pt", "en", "fr", "es", "de"]) {
  const home = await payload.findGlobal({ slug: "homepage", locale });
  const specs = (home?.boat?.specs || []).map(
    (s) => /seat|assent|sitz|banc|asient/i.test(s.label) ? { ...s, value: SEATING_VALUES[locale] } : s
  );
  if (specs.length) {
    await payload.updateGlobal({ slug: "homepage", locale, data: { boat: { ...home.boat, specs } } });
  }
}
console.log("[homepage] seating spec updated");
var settings = await payload.findGlobal({ slug: "site-settings" });
await payload.updateGlobal({
  slug: "site-settings",
  data: { meetingPoint: { ...settings.meetingPoint, mapsUrl: "https://maps.app.goo.gl/YnCcykMwA6u1g2f88" } }
});
console.log("[site-settings] maps url updated");
var SO_CONTENT = {
  en: { eyebrow: "Special Occasions", title: "Planning something to remember?", intro: "A proposal, a wedding toast, an anniversary, a milestone birthday \u2014 tell us your idea and we\u2019ll help shape a private cruise around it. Flowers, cake, a photographer, a specific song for the moment \u2014 if it fits on the river, we\u2019ll do our best to make it happen.", ideas: ["Marriage proposals", "Wedding toasts and elopements", "Anniversaries", "Milestone birthdays", "Bachelor & bachelorette celebrations", "Small corporate gatherings"] },
  pt: { eyebrow: "Ocasi\xF5es Especiais", title: "A planear algo para recordar?", intro: "Um pedido de casamento, um brinde de casamento, um anivers\xE1rio, uma data especial \u2014 conte-nos a sua ideia e ajudamos a construir um cruzeiro privado \xE0 sua volta. Flores, bolo, um fot\xF3grafo, uma m\xFAsica certa para o momento \u2014 se couber no rio, fazemos os poss\xEDveis para acontecer.", ideas: ["Pedidos de casamento", "Brindes de casamento e fugas rom\xE2nticas", "Anivers\xE1rios de casamento", "Anivers\xE1rios redondos", "Despedidas de solteiro(a)", "Pequenos eventos de empresa"] },
  fr: { eyebrow: "Occasions Sp\xE9ciales", title: "Vous pr\xE9parez un moment inoubliable ?", intro: "Une demande en mariage, un toast de mariage, un anniversaire, une date marquante \u2014 dites-nous votre id\xE9e et nous vous aiderons \xE0 organiser une croisi\xE8re priv\xE9e autour de celle-ci. Fleurs, g\xE2teau, photographe, une chanson pr\xE9cise pour l\u2019instant \u2014 si cela tient sur le fleuve, nous ferons de notre mieux pour que cela arrive.", ideas: ["Demandes en mariage", "Toasts de mariage et escapades romantiques", "Anniversaires de mariage", "Anniversaires marquants", "Enterrements de vie de gar\xE7on/jeune fille", "Petits \xE9v\xE9nements d\u2019entreprise"] },
  es: { eyebrow: "Ocasiones Especiales", title: "\xBFPreparando algo para recordar?", intro: "Una pedida de mano, un brindis de boda, un aniversario, una fecha especial \u2014 cu\xE9ntanos tu idea y te ayudamos a organizar un crucero privado a su alrededor. Flores, tarta, un fot\xF3grafo, una canci\xF3n concreta para el momento \u2014 si cabe en el r\xEDo, haremos lo posible para que ocurra.", ideas: ["Pedidas de mano", "Brindis de boda y escapadas rom\xE1nticas", "Aniversarios de boda", "Cumplea\xF1os redondos", "Despedidas de soltero/a", "Peque\xF1os eventos de empresa"] },
  de: { eyebrow: "Besondere Anl\xE4sse", title: "Planen Sie etwas Unvergessliches?", intro: "Ein Heiratsantrag, ein Hochzeitstoast, ein Jubil\xE4um, ein besonderes Datum \u2014 erz\xE4hlen Sie uns Ihre Idee, und wir helfen, eine private Fahrt darum herum zu gestalten. Blumen, Torte, ein Fotograf, ein bestimmtes Lied f\xFCr den Moment \u2014 wenn es auf den Fluss passt, tun wir unser Bestes, damit es Wirklichkeit wird.", ideas: ["Heiratsantr\xE4ge", "Hochzeitstoasts und romantische Fluchten", "Hochzeitstage", "Runde Geburtstage", "Junggesell(inn)enabschiede", "Kleine Firmenfeiern"] }
};
for (const locale of ["en", "pt", "fr", "es", "de"]) {
  const c = SO_CONTENT[locale];
  await payload.updateGlobal({ slug: "special-occasions", locale, data: { eyebrow: c.eyebrow, title: c.title, intro: c.intro, ideas: c.ideas.map((text) => ({ text })) } });
}
console.log("[special-occasions] content seeded in 5 locales");
var already = await payload.find({ collection: "posts", locale: "en", where: { slug: { equals: "special-occasions-douro-cruise" } }, limit: 1 });
if (already.docs.length) {
  console.log("[posts] skip (exists): special-occasions-douro-cruise");
} else {
  const text = (t2, bold = false) => ({ type: "text", detail: 0, format: bold ? 1 : 0, mode: "normal", style: "", text: t2, version: 1 });
  const paragraph = (...parts) => ({ type: "paragraph", children: parts.map((p) => Array.isArray(p) ? text(p[0], p[1]) : text(p)), direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" });
  const heading = (t2) => ({ type: "heading", tag: "h2", children: [text(t2)], direction: "ltr", format: "", indent: 0, version: 1 });
  const listItem = (t2, value) => ({ type: "listitem", children: [text(t2)], direction: "ltr", format: "", indent: 0, version: 1, value });
  const list = (items) => ({ type: "list", listType: "bullet", start: 1, tag: "ul", children: items.map((t2, i) => listItem(t2, i + 1)), direction: "ltr", format: "", indent: 0, version: 1 });
  const doc = (children) => ({ root: { type: "root", children, direction: "ltr", format: "", indent: 0, version: 1 } });
  const en = doc([
    paragraph("Some afternoons on the river call for company \u2014 a small group, new faces, the easy rhythm of a shared cruise. Others call for something else entirely: just your people, your pace, and a boat that\u2019s yours for the hour."),
    heading("A ring, a toast, a \u201Cyes\u201D"),
    paragraph("Golden hour on the Douro has a way of making a moment feel inevitable. We\u2019ve had guests ask the question just as Porto\u2019s rooftops turn amber behind them, ring tucked in a jacket pocket the whole afternoon. A private cruise means no strangers around when it happens \u2014 just the two of you, your host quietly at the helm, and a glass of something cold waiting for the \u201Cyes.\u201D"),
    heading("Anniversaries and milestones"),
    paragraph("A tenth anniversary, a fortieth birthday, a retirement worth marking properly \u2014 these are the afternoons people remember for the wrong reasons if they\u2019re rushed or crowded. On a private cruise, the schedule bends a little to fit the celebration, not the other way around."),
    heading("Making it yours"),
    paragraph("Flowers waiting on the seat when your guest arrives. A cake for the trip back. A specific song queued up for the exact bend in the river where the view opens up. None of it is complicated for us \u2014 it\u2019s mostly about knowing in advance. Tell us the idea, however small or specific, and we\u2019ll tell you honestly what\u2019s possible."),
    list(["Flowers or a small bouquet", "A cake or dessert for the return leg", "A specific song for a specific moment", "A photographer to capture it from the water"]),
    heading("How it works"),
    paragraph("A private cruise means the whole boat is yours \u2014 for your group only, at a time that works within our availability, on either the Day Cruise or the Sunset Cruise. If you\u2019re planning something and want a hand shaping it, our ", ["Special Occasions", true], " page has a short form built for exactly this: tell us the occasion, the date you have in mind, and anything you\u2019re picturing. We\u2019ll take it from there.")
  ]);
  const pt = doc([
    paragraph("H\xE1 tardes no rio que pedem companhia \u2014 um grupo pequeno, caras novas, o ritmo f\xE1cil de um cruzeiro partilhado. Outras pedem uma coisa completamente diferente: s\xF3 as suas pessoas, ao seu ritmo, numa embarca\xE7\xE3o que \xE9 sua por uma hora."),
    heading("Um anel, um brinde, um \u201Csim\u201D"),
    paragraph("A hora dourada no Douro tem uma forma de tornar um momento inevit\xE1vel. J\xE1 tivemos h\xF3spedes a fazer o pedido mesmo quando os telhados do Porto ficam cor de \xE2mbar atr\xE1s deles, o anel guardado no bolso do casaco a tarde toda. Um cruzeiro privado significa que n\xE3o h\xE1 estranhos por perto quando acontece \u2014 s\xF3 os dois, o anfitri\xE3o discretamente ao leme, e um copo de algo fresco \xE0 espera do \u201Csim.\u201D"),
    heading("Anivers\xE1rios e datas redondas"),
    paragraph("Um d\xE9cimo anivers\xE1rio de casamento, um quadrag\xE9simo anivers\xE1rio, uma reforma que merece ser celebrada como deve ser \u2014 s\xE3o tardes que as pessoas recordam pelas raz\xF5es erradas se forem apressadas ou cheias de gente. Num cruzeiro privado, o hor\xE1rio ajusta-se um pouco \xE0 celebra\xE7\xE3o, n\xE3o o contr\xE1rio."),
    heading("Torn\xE1-lo seu"),
    paragraph("Flores \xE0 espera no lugar quando o seu convidado chega. Um bolo para o regresso. Uma m\xFAsica certa programada para a curva exata do rio onde a vista se abre. Nada disto \xE9 complicado para n\xF3s \u2014 \xE9 sobretudo uma quest\xE3o de sabermos com anteced\xEAncia. Diga-nos a ideia, por mais pequena ou espec\xEDfica que seja, e diremos honestamente o que \xE9 poss\xEDvel."),
    list(["Flores ou um pequeno ramo", "Um bolo ou sobremesa para o regresso", "Uma m\xFAsica certa para um momento certo", "Um fot\xF3grafo para captar tudo a partir do rio"]),
    heading("Como funciona"),
    paragraph("Um cruzeiro privado significa que a embarca\xE7\xE3o toda \xE9 sua \u2014 s\xF3 para o seu grupo, numa hora que encaixe na nossa disponibilidade, tanto no Cruzeiro Diurno como no Cruzeiro P\xF4r do Sol. Se est\xE1 a planear algo e quer ajuda a dar-lhe forma, a nossa p\xE1gina de ", ["Ocasi\xF5es Especiais", true], " tem um formul\xE1rio curto feito exatamente para isto: diga-nos a ocasi\xE3o, a data que tem em mente, e o que est\xE1 a imaginar. Tratamos do resto.")
  ]);
  const media = await payload.find({ collection: "media", where: { filename: { equals: "bow-sunset.png" } }, limit: 1 });
  const coverImage = media.docs[0]?.id;
  const created = await payload.create({
    collection: "posts",
    locale: "en",
    data: {
      title: "Celebrating Onboard: Proposals, Anniversaries and Special Occasions on the Douro",
      slug: "special-occasions-douro-cruise",
      excerpt: "From marriage proposals to milestone birthdays, here\u2019s how a private cruise on the Douro can become the backdrop for a moment you\u2019ll remember.",
      coverImage,
      content: en,
      status: "published",
      publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
      category: "onboard",
      author: "Douro Wonders",
      readingMinutes: 4
    }
  });
  await payload.update({
    collection: "posts",
    id: created.id,
    locale: "pt",
    data: {
      title: "Celebrar a Bordo: Pedidos de Casamento, Anivers\xE1rios e Ocasi\xF5es Especiais no Douro",
      excerpt: "De pedidos de casamento a anivers\xE1rios redondos, veja como um cruzeiro privado no Douro pode ser o cen\xE1rio para um momento que vai recordar.",
      content: pt
    }
  });
  console.log("[posts] created: special-occasions-douro-cruise");
}
console.log("DONE");
process.exit(0);
