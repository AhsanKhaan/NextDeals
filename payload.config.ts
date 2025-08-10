import path from "path"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { slateEditor } from "@payloadcms/richtext-slate" // Still using slateEditor for now
import { buildConfig } from "payload"

import { Users } from "./src/collections/Users"
import { Categories } from "./src/collections/Categories"
import { Products } from "./src/collections/Products"
import { PriceHistory } from "./src/collections/PriceHistory"
import { NewsletterSubscribers } from "./src/collections/NewsletterSubscribers"
import { Media } from "./src/collections/Media"
export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: slateEditor({}), // Ensure this is compatible with v3
  collections: [Users, Categories, Products, PriceHistory, NewsletterSubscribers, Media],
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), "generated-schema.graphql"),
  },
  plugins: [],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/dealscope",
    connectOptions: {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "your-secret-here",
  // CORS and CSRF are now configured directly in the server.ts or express app setup in Payload v3
  // For Next.js App Router, these are often handled by Next.js itself or middleware.
  // If you are running Payload as a standalone server, you might need to configure these in your server entry file.
  // For this integrated setup, Payload's internal server will handle it.
  // rateLimit is not a valid property in Payload v3 config and should be configured at the server/middleware level if needed.
})
