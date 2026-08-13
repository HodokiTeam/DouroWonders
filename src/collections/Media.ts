import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'card', width: 900, height: 675, position: 'centre' },
      { name: 'wide', width: 1800 },
    ],
    mimeTypes: ['image/*'],
  },
}
