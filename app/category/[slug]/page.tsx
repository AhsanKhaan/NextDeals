import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { CategoryHeader } from "@/components/category-header"
import { Breadcrumb } from "@/components/breadcrumb"
import { getPayloadClient } from "@/src/lib/payload"

// ISR: Revalidate every hour
export const revalidate = 3600

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: "categories",
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 100,
  })

  return categories.docs.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const payload = await getPayloadClient()

  // Fetch category
  const categoryResult = await payload.find({
    collection: "categories",
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  if (categoryResult.docs.length === 0) {
    notFound()
  }

  const category = categoryResult.docs[0]

  // Fetch products for this category
  const products = await payload.find({
    collection: "products",
    where: {
      and: [
        {
          category: {
            equals: category.id,
          },
        },
        {
          "status.isActive": {
            equals: true,
          },
        },
      ],
    },
    populate: {
      images: true,
      category: true,
    },
    limit: 20,
    sort: "-createdAt",
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category.name, href: `/category/${params.slug}` },
        ]}
      />
      <CategoryHeader
        title={category.name}
        description={category.description || `Find the best deals in ${category.name}`}
      />
      <ProductGrid products={products.docs} />
    </div>
  )
}
