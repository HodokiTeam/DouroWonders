import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
      ],
    },
    { name: 'email', type: 'text', required: true },
    {
      name: 'formEndpoint',
      type: 'text',
      label: 'Contact form endpoint (not in use)',
      admin: {
        description:
          'Superseded — the contact form now sends through the transactional email API configured on the server. Messages arrive by email and are always saved under Contact Messages.',
      },
    },
    {
      name: 'whatsapp',
      type: 'text',
      admin: { description: 'WhatsApp number in international format, e.g. "+351 918 030 672"' },
    },
    {
      name: 'phones',
      type: 'array',
      labels: { singular: 'Phone', plural: 'Phones' },
      fields: [
        { name: 'label', type: 'text', admin: { description: 'e.g. "António" or "Bookings"' } },
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "+351 918 030 672"' } },
      ],
    },
    {
      name: 'meetingPoint',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', admin: { description: 'e.g. "Douro Marina | Afurada"' } },
        { name: 'addressLines', type: 'array', fields: [{ name: 'line', type: 'text', required: true }] },
        { name: 'arrivalNote', type: 'text', localized: true },
        { name: 'mapsUrl', type: 'text', admin: { description: 'Google Maps directions link' } },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'google', type: 'text' },
      ],
    },
    {
      name: 'bokun',
      type: 'group',
      fields: [
        {
          name: 'bookingChannelUUID',
          type: 'text',
          admin: { description: 'Bókun booking channel UUID used to load the widget script.' },
        },
      ],
    },
    {
      name: 'cancellationPolicy',
      type: 'textarea',
      localized: true,
      admin: { description: 'Shown on the cancellation policy page and FAQ area.' },
    },
    {
      name: 'legal',
      type: 'group',
      fields: [
        { name: 'companyName', type: 'text' },
        { name: 'rnaat', type: 'text', admin: { description: 'RNAAT registration number, e.g. "RNAAT 88/2002"' } },
        { name: 'livroReclamacoesUrl', type: 'text', admin: { description: 'Livro de Reclamações link (or leave empty for placeholder).' } },
      ],
    },
  ],
}
