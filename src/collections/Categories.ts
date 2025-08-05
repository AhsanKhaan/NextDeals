import type { CollectionConfig } from "payload/types"

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "parent", "productCount", "updatedAt"],
    listSearchableFields: ["name", "description"],
  },
  access: {
    read: () => true,
  },
  // MongoDB indexes for high performance
  indexes: [
    {
      fields: {
        slug: 1,
      },
      options: {
        unique: true,
      },
    },
    {
      fields: {
        parent: 1,
        level: 1,
      },
    },
    {
      fields: {
        isActive: 1,
        isFeatured: 1,
      },
    },
    {
      fields: {
        sortOrder: 1,
        level: 1,
      },
    },
  ],
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true, // MongoDB text index for search
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL-friendly version of the name",
      },
    },
    {
      name: "description",
      type: "textarea",
      index: true, // For search functionality
    },
    {
      name: "shortDescription",
      type: "text",
      admin: {
        description: "Brief description for cards",
      },
    },
    {
      name: "icon",
      type: "select",
      options: [
        { label: "Smartphone", value: "smartphone" },
        { label: "Laptop", value: "laptop" },
        { label: "Headphones", value: "headphones" },
        { label: "Camera", value: "camera" },
        { label: "Home", value: "home" },
        { label: "Sofa", value: "sofa" },
        { label: "Kitchen", value: "kitchen" },
        { label: "Garden", value: "garden" },
        { label: "Shirt", value: "shirt" },
        { label: "Shoes", value: "shoes" },
        { label: "Watch", value: "watch" },
        { label: "Bag", value: "bag" },
        { label: "Heart", value: "heart" },
        { label: "Sparkles", value: "sparkles" },
        { label: "Dumbbell", value: "dumbbell" },
        { label: "Activity", value: "activity" },
        { label: "Book", value: "book" },
        { label: "Music", value: "music" },
      ],
      defaultValue: "smartphone",
    },
    {
      name: "color",
      type: "select",
      options: [
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Purple", value: "purple" },
        { label: "Pink", value: "pink" },
        { label: "Orange", value: "orange" },
        { label: "Indigo", value: "indigo" },
        { label: "Red", value: "red" },
        { label: "Yellow", value: "yellow" },
      ],
      defaultValue: "blue",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      index: true,
      admin: {
        description: "Parent category for subcategories",
      },
    },
    {
      name: "level",
      type: "number",
      index: true,
      admin: {
        readOnly: true,
        description: "Category depth level (0 = root, 1 = subcategory, etc.)",
      },
      defaultValue: 0,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      index: true,
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        description: "Show in featured categories section",
      },
    },
    {
      name: "productCount",
      type: "number",
      index: true,
      admin: {
        readOnly: true,
        description: "Automatically calculated",
      },
      defaultValue: 0,
    },
    {
      name: "subcategoryCount",
      type: "number",
      admin: {
        readOnly: true,
        description: "Number of subcategories",
      },
      defaultValue: 0,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        description: "Display order (lower numbers first)",
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "keywords",
          type: "text",
        },
      ],
    },
    // High traffic optimization fields
    {
      name: "viewCount",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        readOnly: true,
        description: "Page view count for analytics",
      },
    },
    {
      name: "lastViewedAt",
      type: "date",
      index: true,
      admin: {
        readOnly: true,
        description: "Last time this category was viewed",
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-generate slug from name
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        }

        // Calculate category level based on parent
        if (data.parent) {
          const parent = await req.payload.findByID({
            collection: "categories",
            id: data.parent,
          })
          data.level = (parent.level || 0) + 1
        } else {
          data.level = 0
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        // Update parent's subcategory count
        if (doc.parent && operation === "create") {
          const siblings = await req.payload.find({
            collection: "categories",
            where: {
              parent: {
                equals: doc.parent,
              },
            },
          })

          await req.payload.update({
            collection: "categories",
            id: doc.parent,
            data: {
              subcategoryCount: siblings.totalDocs,
            },
          })
        }
      },
    ],
  },
}

export default Categories
