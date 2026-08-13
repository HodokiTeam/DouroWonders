import type { Field, GlobalConfig } from 'payload'

/** Marks a field as translatable — its value is stored per language. */
const t = <T extends Field>(field: T): T => ({ ...field, localized: true })

// Unnamed tabs keep every field at the top level (home.hero, home.route, …)
// while grouping the admin UI by the section it controls on the page.
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description:
      'Edit the homepage section by section. Each tab matches a block on the live page, top to bottom. Use the language selector to translate.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '1 · Hero',
          description: 'Top of the page — headline, subheadline, buttons and the rotating photo.',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                t({ name: 'headline', type: 'text', required: true }),
                t({ name: 'subheadline', type: 'textarea', required: true }),
                t({ name: 'primaryCta', type: 'text', required: true }),
                t({ name: 'secondaryCta', type: 'text', required: true }),
                t({ name: 'mobileStickyCta', type: 'text', required: true }),
                { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'First / main hero photo.' } },
              ],
            },
          ],
        },
        {
          label: '2 · Launch Offer',
          description: 'The announcement bar and the launch-offer band. Turn it off when the offer ends.',
          fields: [
            {
              name: 'campaign',
              type: 'group',
              label: 'Launch campaign',
              fields: [
                {
                  name: 'active',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Turn off when the launch offer ends — the top banner and offer band disappear.' },
                },
                t({
                  name: 'badgeText',
                  type: 'textarea',
                  admin: { description: 'Shown in the top announcement bar and the offer band.' },
                }),
                t({ name: 'offerTitle', type: 'text' }),
                t({ name: 'offerBody', type: 'textarea' }),
              ],
            },
          ],
        },
        {
          label: '3 · Experiences',
          description: 'Headings for the experiences section. The cards come from the Experiences collection.',
          fields: [
            {
              name: 'experiencesSection',
              type: 'group',
              label: 'Experiences section',
              fields: [
                t({ name: 'title', type: 'text', admin: { description: 'e.g. "Choose your Douro experience"' } }),
                t({ name: 'lead', type: 'textarea' }),
                t({ name: 'sharedLabel', type: 'text', admin: { description: 'e.g. "Shared Cruises"' } }),
                t({ name: 'sharedTag', type: 'text' }),
                t({ name: 'privateLabel', type: 'text', admin: { description: 'e.g. "Private Cruises"' } }),
                t({ name: 'privateTag', type: 'text' }),
              ],
            },
          ],
        },
        {
          label: '4 · Route',
          description: 'The interactive route map — stops, heading and note.',
          fields: [
            {
              name: 'route',
              type: 'group',
              fields: [
                t({ name: 'title', type: 'text', admin: { description: 'e.g. "From the marina to the bridges"' } }),
                t({ name: 'lead', type: 'textarea' }),
                t({
                  name: 'stops',
                  type: 'array',
                  labels: { singular: 'Stop', plural: 'Stops' },
                  fields: [{ name: 'stop', type: 'text', required: true }],
                }),
                t({ name: 'note', type: 'text', admin: { description: 'Mandatory route-variation note.' } }),
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: '5 · The Boat',
          description: 'Photo, description, specs and gallery of the boat.',
          fields: [
            {
              name: 'boat',
              type: 'group',
              label: 'The Boat',
              fields: [
                t({ name: 'headline', type: 'text' }),
                t({ name: 'body', type: 'textarea' }),
                t({
                  name: 'specs',
                  type: 'array',
                  labels: { singular: 'Spec', plural: 'Specs' },
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                }),
                { name: 'image', type: 'upload', relationTo: 'media' },
                {
                  name: 'gallery',
                  type: 'array',
                  labels: { singular: 'Photo', plural: 'Photos' },
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: '6 · Included',
          description: "The \"What's included\" list.",
          fields: [
            {
              name: 'included',
              type: 'group',
              label: "What's included",
              fields: [
                t({ name: 'title', type: 'text', admin: { description: 'e.g. "What’s included"' } }),
                t({
                  name: 'intro',
                  type: 'textarea',
                  admin: { description: 'One-sentence version shown under the heading.' },
                }),
                t({
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Item', plural: 'Items' },
                  fields: [{ name: 'item', type: 'text', required: true }],
                }),
              ],
            },
          ],
        },
        {
          label: '7 · Boutique',
          description: 'The Onboard Boutique band.',
          fields: [
            {
              name: 'boutique',
              type: 'group',
              label: 'Onboard Boutique',
              fields: [
                t({ name: 'headline', type: 'text' }),
                t({ name: 'body', type: 'textarea' }),
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: '8 · About / Founders',
          description: 'Intro plus the Inês and António feature rows.',
          fields: [
            {
              name: 'founders',
              type: 'group',
              fields: [
                t({ name: 'headline', type: 'text' }),
                t({ name: 'body', type: 'textarea' }),
                { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'The two of them together.' } },
                {
                  name: 'ines',
                  type: 'group',
                  label: 'Inês',
                  fields: [
                    { name: 'name', type: 'text' },
                    t({ name: 'role', type: 'text' }),
                    t({ name: 'bio', type: 'textarea' }),
                    { name: 'photo', type: 'upload', relationTo: 'media' },
                  ],
                },
                {
                  name: 'antonio',
                  type: 'group',
                  label: 'António',
                  fields: [
                    { name: 'name', type: 'text' },
                    t({ name: 'role', type: 'text' }),
                    t({ name: 'bio', type: 'textarea' }),
                    { name: 'photo', type: 'upload', relationTo: 'media' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '9 · FAQ',
          description: 'Heading for the FAQ section. The questions themselves live in the FAQs collection.',
          fields: [
            {
              name: 'faqSection',
              type: 'group',
              label: 'FAQ section',
              fields: [
                t({ name: 'title', type: 'text', admin: { description: 'e.g. "Frequently asked questions"' } }),
                t({ name: 'lead', type: 'textarea' }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
