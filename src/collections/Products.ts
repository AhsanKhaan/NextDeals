import type { CollectionConfig } from "payload/types"

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "currentPrice", "category", "isFeatured", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  // MongoDB indexes for high performance queries
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
        category: 1,
        "status.isActive": 1,
      },
    },
    {
      fields: {
        "status.isFeatured": 1,
        "status.isActive": 1,
      },
    },
    {
      fields: {
        "status.isTrending": 1,
        "status.isActive": 1,
      },
    },
    {
      fields: {
        "pricing.currentPrice": 1,
        "status.isActive": 1,
      },
    },
    {
      fields: {
        rating: -1,
        "status.isActive": 1,
      },
    },
    {
      fields: {
        createdAt: -1,
      },
    },
    // Text search index for product search
    {
      fields: {
        title: "text",
        description: "text",
        shortDescription: "text",
        brand: "text",
      },
    },
  ],
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      index: true,
      admin: {
        description: "Product name/title",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL-friendly version of the title",
      },
    },
    {
      name: "description",
      type: "richText",
      admin: {
        description: "Full product description",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      index: true,
      admin: {
        description: "Brief description for cards and previews",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      index: true,
    },
    {
      name: "brand",
      type: "text",
      index: true,
    },
    {
      name: "model",
      type: "text",
    },
    {
      name: "sku",
      type: "text",
      index: true,
      admin: {
        description: "Stock Keeping Unit",
      },
    },
    {
      name: "pricing",
      type: "group",
      fields: [
        {
          name: "originalPrice",
          type: "number",
          required: true,
          index: true,
          admin: {
            step: 0.01,
          },
        },
        {
          name: "currentPrice",
          type: "number",
          required: true,
          index: true,
          admin: {
            step: 0.01,
          },
        },
        {
          name: "discountPercentage",
          type: "number",
          index: true,
          admin: {
            readOnly: true,
            description: "Automatically calculated",
          },
        },
      ],
    },
    {
      name: "rating",
      type: "number",
      min: 0,
      max: 5,
      index: true,
      admin: {
        step: 0.1,
      },
    },
    {
      name: "reviewCount",
      type: "number",
      defaultValue: 0,
      index: true,
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "affiliateUrl",
      type: "text",
      required: true,
      admin: {
        description: "Affiliate link to the product",
      },
    },
    {
      name: "merchant",
      type: "select",
      options: [
        { label: "Amazon", value: "amazon" },
        { label: "eBay", value: "ebay" },
        { label: "Best Buy", value: "bestbuy" },
        { label: "Target", value: "target" },
        { label: "Walmart", value: "walmart" },
        { label: "Other", value: "other" },
      ],
      required: true,
      index: true,
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "status",
      type: "group",
      fields: [
        {
          name: "isFeatured",
          type: "checkbox",
          defaultValue: false,
          index: true,
          admin: {
            description: "Show on homepage featured section",
          },
        },
        {
          name: "isTrending",
          type: "checkbox",
          defaultValue: false,
          index: true,
          admin: {
            description: "Show in trending section",
          },
        },
        {
          name: "isActive",
          type: "checkbox",
          defaultValue: true,
          index: true,
          admin: {
            description: "Product is active and visible",
          },
        },
      ],
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
    // High traffic analytics fields
    {
      name: "analytics",
      type: "group",
      fields: [
        {
          name: "viewCount",
          type: "number",
          defaultValue: 0,
          index: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: "clickCount",
          type: "number",
          defaultValue: 0,
          index: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: "conversionRate",
          type: "number",
          admin: {
            readOnly: true,
            step: 0.01,
          },
        },
        {
          name: "lastViewedAt",
          type: "date",
          index: true,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug from title
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        }

        // Calculate discount percentage
        if (data.pricing?.originalPrice && data.pricing?.currentPrice) {
          const discount = ((data.pricing.originalPrice - data.pricing.currentPrice) / data.pricing.originalPrice) * 100
          data.pricing.discountPercentage = Math.round(discount)
        }

        // Calculate conversion rate
        if (data.analytics?.viewCount && data.analytics?.clickCount) {
          data.analytics.conversionRate = (data.analytics.clickCount / data.analytics.viewCount) * 100
        }

        return data
      },
    ],
  },
}
