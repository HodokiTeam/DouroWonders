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
      labels: { singular: 'Idea', plural: 'Ideas' },
      admin: { description: 'Short list of occasion ideas shown as bullets, e.g. "Marriage proposals".' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
