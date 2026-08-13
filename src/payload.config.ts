import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Experiences } from './collections/Experiences'
import { FAQs } from './collections/FAQs'
import { Posts } from './collections/Posts'
import { ContactMessages } from './collections/ContactMessages'
import { SiteSettings } from './globals/SiteSettings'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Douro Wonders Admin',
    },
  },
  collections: [Experiences, FAQs, Posts, ContactMessages, Media, Users],
  globals: [Homepage, SiteSettings],
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Português', code: 'pt' },
      { label: 'Français', code: 'fr' },
      { label: 'Español', code: 'es' },
      { label: 'Deutsch', code: 'de' },
    ],
    defaultLocale: 'en',
    // Untranslated fields fall back to English, so nothing is ever blank.
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  sharp,
})
