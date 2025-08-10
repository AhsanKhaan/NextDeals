import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Use dynamic imports to avoid circular dependencies
const Users = (await import('./collections/Users')).Users
const Media = (await import('./collections/Media')).Media
const Categories = (await import('./collections/Categories')).Categories
const NewsletterSubscribers = (await import('./collections/NewsletterSubscribers')).NewsletterSubscribers
const PriceHistory = (await import('./collections/PriceHistory')).PriceHistory
const Products = (await import('./collections/Products')).Products

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users', // Hardcode the slug instead of Users.slug
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, NewsletterSubscribers, PriceHistory, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
})