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
    { name: 'order', type: 'number', defaultValue: 0, admin: { description: 'Sort order (lowest first)' } },
  ],
}
