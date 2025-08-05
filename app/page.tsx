import { AnimatedHeroSection } from "@/components/animated-hero-section"
import { AnimatedFeaturedDeals } from "@/components/animated-featured-deals"
import { AnimatedCategoryGrid } from "@/components/animated-category-grid"
import { TrendingProducts } from "@/components/trending-products"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { getPayloadClient } from "@/src/lib/payload"

// ISR: Revalidate every hour
export const revalidate = 3600

export default async function HomePage() {
  const payload = await getPayloadClient()

  // Fetch featured products
  const featuredProducts = await payload.find({
    collection: "products",
    where: {
      and: [
        {
          "status.isFeatured": {
            equals: true,
          },
        },
        {
          "status.isActive": {
            equals: true,
          },
        },
      ],
    },
    limit: 6,
    populate: {
      category: true,
      images: true,
    },
  })

  // Fetch trending products
  const trendingProducts = await payload.find({
    collection: "products",
    where: {
      and: [
        {
          "status.isTrending": {
            equals: true,
          },
        },
        {
          "status.isActive": {
            equals: true,
          },
        },
      ],
    },
    limit: 8,
    populate: {
      category: true,
      images: true,
    },
  })

  // Fetch all categories (including subcategories)
  const categories = await payload.find({
    collection: "categories",
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 50,
    sort: ["level", "sortOrder", "name"],
  })

  return (
    <div className="space-y-0">
      <AnimatedHeroSection />
      <div className="container mx-auto px-4">
        <AnimatedFeaturedDeals products={featuredProducts.docs} />
        <div className="section-divider" />
        <AnimatedCategoryGrid categories={categories.docs} />
        <div className="section-divider" />
        <TrendingProducts products={trendingProducts.docs} />
        <div className="section-divider" />
        <NewsletterSignup />
      </div>
    </div>
  )
}
