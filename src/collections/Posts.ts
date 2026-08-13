import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    description:
      'Guides and stories about the Douro, Porto and life on the river. Good content here is what brings people to the site from Google.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: { description: 'URL path, e.g. "best-time-douro-river-cruise". Same across all languages.' },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: 'One or two sentences shown on the blog index and in Google results.' },
            },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', localized: true },
          ],
        },
        {
          label: 'Publishing',
          fields: [
            {
              name: 'status',
              type: 'select',
              defaultValue: 'published',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
            },
            { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
            {
              name: 'category',
              type: 'select',
              defaultValue: 'guides',
              options: [
                { label: 'Porto & Douro Guides', value: 'guides' },
                { label: 'On Board', value: 'onboard' },
                { label: 'Local Knowledge', value: 'local' },
                { label: 'News', value: 'news' },
              ],
            },
            { name: 'author', type: 'text', defaultValue: 'Douro Wonders' },
            {
              name: 'readingMinutes',
              type: 'number',
              admin: { description: 'Estimated reading time in minutes. Leave empty to hide.' },
            },
            {
              name: 'relatedExperience',
              type: 'relationship',
              relationTo: 'experiences',
              admin: { description: 'Shown as a booking call-to-action at the end of the article.' },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Overrides the page title in Google. Aim for under 60 characters.' },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Meta description. Aim for 150–160 characters.' },
            },
            {
              name: 'keywords',
              type: 'text',
              localized: true,
              admin: { description: 'Comma-separated focus keywords for this article.' },
            },
          ],
        },
      ],
    },
  ],
}
