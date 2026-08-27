/**
 * Creates the tables for the Special Occasions global, extracted verbatim
 * from the local dev database's schema (production doesn't auto-push
 * schema changes, so this one-off DDL step is needed once).
 *
 * Run inside the container:
 *   node /app/scripts/create-special-occasions-tables.mjs
 */
import { createClient } from '@libsql/client'

const client = createClient({ url: 'file:/app/data/payload.db' })

const statements = [
  `CREATE TABLE IF NOT EXISTS \`special_occasions\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`image_id\` integer,
	\`updated_at\` text,
	\`created_at\` text,
	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
)`,
  `CREATE TABLE IF NOT EXISTS \`special_occasions_ideas\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_locale\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`text\` text NOT NULL,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`special_occasions\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`,
  `CREATE TABLE IF NOT EXISTS \`special_occasions_locales\` (
	\`eyebrow\` text,
	\`title\` text,
	\`intro\` text,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`_locale\` text NOT NULL,
	\`_parent_id\` integer NOT NULL,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`special_occasions\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`,
]

for (const sql of statements) {
  await client.execute(sql)
  console.log('OK:', sql.split('\n')[0])
}
console.log('DONE')
process.exit(0)
