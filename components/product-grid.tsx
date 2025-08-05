import { Card, CardContent } from "@/components/ui/card" // Reverted import
import { Badge } from "@/components/ui/badge" // Reverted import
import { Button } from "@/components/ui/button" // Reverted import
import { Star } from "lucide-react"
import Image from "next/image"

interface ProductGridProps {
  products: any[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
        <p className="text-muted-foreground">Check back soon for new deals in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="relative mb-4">
              <Image
                src={product.images?.[0]?.image?.url || "/placeholder.svg?height=200&width=200"}
                alt={product.images?.[0]?.alt || product.title}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              {product.pricing?.discountPercentage > 0 && (
                <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                  {product.pricing.discountPercentage}% OFF
                </Badge>
              )}
            </div>

            <Badge variant="secondary" className="mb-2 text-xs">
              {product.category?.name}
            </Badge>

            <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>

            {product.shortDescription && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.shortDescription}</p>
            )}

            {product.rating && (
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{product.rating}</span>
                {product.reviewCount > 0 && (
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-primary">${product.pricing?.currentPrice}</span>
              {product.pricing?.originalPrice > product.pricing?.currentPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.pricing?.originalPrice}</span>
              )}
            </div>

            <Button className="w-full" asChild>
              <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                View Deal
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
