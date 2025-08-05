import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card" // Reverted import
import { Smartphone, Home, Shirt, Heart, Activity, Book } from "lucide-react"

const iconMap: Record<string, any> = {
  electronics: Smartphone,
  "home-garden": Home,
  fashion: Shirt,
  "health-beauty": Heart,
  "sports-outdoors": Activity,
  "books-media": Book,
}

const colorMap: Record<string, string> = {
  electronics: "bg-blue-500",
  "home-garden": "bg-green-500",
  fashion: "bg-purple-500",
  "health-beauty": "bg-pink-500",
  "sports-outdoors": "bg-orange-500",
  "books-media": "bg-indigo-500",
}

interface CategoryGridProps {
  categories: any[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="article-title text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-muted-foreground">Find deals in your favorite categories</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const IconComponent = iconMap[category.slug] || Smartphone
          const colorClass = colorMap[category.slug] || "bg-gray-500"

          return (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <p className="text-sm font-medium text-primary">{category.productCount || 0} deals available</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
