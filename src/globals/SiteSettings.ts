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
      name: 'googleReviewUrl',
      type: 'text',
      admin: { description: 'Deep link that opens the "write a review" box on the Google Business profile.' },
    },
    {
      name: 'footerTagline',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short line shown under the logo in the footer.' },
    },
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
      name: 'cofinancing',
      type: 'group',
      label: 'Co-financing (footer)',
      admin: { description: 'Funding-program logos shown in the footer, e.g. Turismo de Portugal, Portugal 2030, União Europeia.' },
      fields: [
        { name: 'label', type: 'text', localized: true, admin: { description: 'e.g. "Co-financed by:"' } },
        {
          name: 'logos',
          type: 'array',
          labels: { singular: 'Logo', plural: 'Logos' },
          fields: [
            { name: 'name', type: 'text', required: true, admin: { description: 'e.g. "Portugal 2030" — used as the image alt text.' } },
            { name: 'logo', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Use the official reversed/white version for this dark background, if the program provides one.' } },
            { name: 'url', type: 'text', admin: { description: 'Link to the program\'s website.' } },
          ],
        },
      ],
    },
    {
      name: 'legal',
      type: 'group',
      fields: [
        { name: 'companyName', type: 'text' },
        { name: 'rnaat', type: 'text', admin: { description: 'RNAAT registration number, e.g. "RNAAT 88/2002"' } },
        { name: 'livroReclamacoesUrl', type: 'text', admin: { description: 'Livro de Reclamações link (or leave empty for placeholder).' } },
        {
          name: 'termsContent',
          type: 'richText',
          localized: true,
          admin: { description: 'Shown on the Terms & Conditions page.' },
        },
      ],
    },
  ],
}
