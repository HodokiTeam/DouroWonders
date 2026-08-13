import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: 'Experience', plural: 'Experiences' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', 'slug'],
    description:
      'The cruise experiences sold on the website. Each experience has a shared (per person) and a private (whole boat) rate — matching the Bókun structure.',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path, e.g. "day-cruise". Stays the same in every language.' },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Porto: Small-Group Douro River Day Cruise"' },
    },
    { name: 'duration', type: 'text', required: true, localized: true, admin: { description: 'e.g. "90 minutes"' } },
    {
      name: 'schedule',
      type: 'array',
      labels: { singular: 'Departure time', plural: 'Departure times' },
      fields: [{ name: 'time', type: 'text', required: true }],
    },
    {
      name: 'shared',
      type: 'group',
      label: 'Shared rate (per person, up to 12)',
      fields: [
        { name: 'referencePrice', type: 'number', admin: { description: 'Reference price in € per person' } },
        { name: 'launchPrice', type: 'number', required: true, admin: { description: 'Launch price in € per person' } },
        { name: 'shortCopy', type: 'textarea', required: true, localized: true },
        { name: 'ctaLabel', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Book Day Cruise"' } },
      ],
    },
    {
      name: 'private',
      type: 'group',
      label: 'Private rate (whole boat)',
      fields: [
        { name: 'launchPrice', type: 'number', required: true, admin: { description: 'Launch price in € per boat' } },
        { name: 'subtitle', type: 'text', localized: true, admin: { description: 'e.g. "Private Douro Day Cruise"' } },
        { name: 'shortCopy', type: 'textarea', required: true, localized: true },
        { name: 'ctaLabel', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Book Private Day Cruise"' } },
      ],
    },
    {
      name: 'bokun',
      type: 'group',
      label: 'Bókun booking',
      fields: [
        {
          name: 'widgetSrc',
          type: 'text',
          admin: {
            description:
              'The data-src URL of the Bókun calendar widget for this experience, e.g. https://widgets.bokun.io/online-sales/…/experience-calendar/1249232',
          },
        },
      ],
    },
    {
      name: 'details',
      type: 'group',
      label: 'Detail page content',
      fields: [
        {
          name: 'languages',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "English, French, Portuguese, Spanish, German"' },
        },
        {
          name: 'highlights',
          type: 'array',
          localized: true,
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'fullDescription',
          type: 'textarea',
          localized: true,
          admin: { description: 'Long description. Blank lines create paragraphs.' },
        },
        {
          name: 'itinerary',
          type: 'array',
          localized: true,
          fields: [
            { name: 'stop', type: 'text', required: true },
            { name: 'note', type: 'text', admin: { description: 'e.g. "Photo stop, Scenic views on the way"' } },
          ],
        },
        {
          name: 'includes',
          type: 'array',
          localized: true,
          fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
          name: 'notSuitableFor',
          type: 'array',
          localized: true,
          fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
          name: 'notAllowed',
          type: 'array',
          localized: true,
          fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
          name: 'knowBeforeYouGo',
          type: 'array',
          localized: true,
          fields: [{ name: 'item', type: 'text', required: true }],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Main image (hero + homepage card)' } },
    { name: 'imagePrivate', type: 'upload', relationTo: 'media', admin: { description: 'Image for the private-rate card' } },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo gallery',
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: { description: 'Shown as a gallery on this experience’s detail page.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Sort order on the homepage (lowest first)' },
    },
  ],
}
