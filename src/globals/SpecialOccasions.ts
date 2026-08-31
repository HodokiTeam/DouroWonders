import type { GlobalConfig } from 'payload'

export const SpecialOccasions: GlobalConfig = {
  slug: 'special-occasions',
  label: 'Special Occasions Page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'ideas',
      type: 'array',
      localized: true,
      labels: { singular: 'Occasion', plural: 'Occasions' },
      admin: { description: 'Short list of occasion ideas shown as bullets, e.g. "Wedding Proposals".' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'extras',
      type: 'array',
      localized: true,
      labels: { singular: 'Extra', plural: 'Optional Extras' },
      admin: { description: 'Short list of optional add-ons shown as bullets, e.g. "Photographer".' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'closingLine', type: 'text', localized: true, admin: { description: 'e.g. "Have something else in mind? Tell us what you\'re planning."' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
