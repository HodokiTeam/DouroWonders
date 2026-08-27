import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order'],
    description: 'Practical booking questions shown on the website.',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'textarea', required: true, localized: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { description: 'Sort order within its section (lowest first)' } },
    {
      name: 'section',
      type: 'select',
      defaultValue: 'booking',
      options: [
        { label: 'Booking & the cruise', value: 'booking' },
        { label: 'Meeting point', value: 'meeting-point' },
        { label: 'Getting here', value: 'getting-here' },
        { label: 'Onboard', value: 'onboard' },
        { label: 'Guests & accessibility', value: 'guests' },
        { label: 'Weather & seasonality', value: 'weather' },
      ],
      admin: { description: 'Groups this question under a heading on the FAQ page.' },
    },
  ],
}
