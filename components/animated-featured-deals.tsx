"use client"

import { motion } from "framer-motion"
import { CardContent, CardHeader } from "@/components/ui/card" // Reverted import
import { Badge } from "@/components/ui/badge" // Reverted import
import { Button } from "@/components/ui/button" // Reverted import
import { AnimatedCard } from "@/components/ui/animated-card"
import { Star, TrendingDown, Heart, Share2, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Tilt from "react-parallax-tilt"

interface AnimatedFeaturedDealsProps {
  products: any[]
}

export function AnimatedFeaturedDeals({ products }: AnimatedFeaturedDealsProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts)
    if (newLiked.has(productId)) {
      newLiked.delete(productId)
    } else {
      newLiked.add(productId)
    }
    setLikedProducts(newLiked)
  }

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="article-title text-4xl md:text-5xl font-bold mb-2">Featured Deals</h2>
            <p className="text-xl text-muted-foreground">Hand-picked deals with the biggest savings</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg">
              View All Deals
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Tilt
              key={product.id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
              gyroscope={true}
            >
              <AnimatedCard delay={index * 0.1} direction="up" hover={false} className="h-full">
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="relative group">
                    <Image
                      src={product.images?.[0]?.image?.url || "/placeholder.svg?height=250&width=400"}
                      alt={product.images?.[0]?.alt || product.title}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        onClick={() => toggleLike(product.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart
                          className={`w-4 h-4 ${likedProducts.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Discount Badge */}
                    {product.pricing?.discountPercentage > 0 && (
                      <motion.div
                        className="absolute top-4 left-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {product.pricing.discountPercentage}% OFF
                        </Badge>
                      </motion.div>
                    )}

                    {/* Category Badge */}
                    <motion.div
                      className="absolute bottom-4 left-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {product.category?.name}
                      </Badge>
                    </motion.div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <motion.h3
                    className="font-bold text-lg mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {product.title}
                  </motion.h3>

                  {product.rating && (
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-2">{product.rating}</span>
                      </div>
                      {product.reviewCount > 0 && (
                        <span className="text-sm text-muted-foreground">
                          ({product.reviewCount.toLocaleString()} reviews)
                        </span>
                      )}
                    </motion.div>
                  )}

                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    <span className="text-3xl font-bold text-primary">${product.pricing?.currentPrice}</span>
                    {product.pricing?.originalPrice > product.pricing?.currentPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.pricing?.originalPrice}
                      </span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <Button
                      className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-300"
                      asChild
                    >
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                        View Deal
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </motion.div>
                </CardContent>
              </AnimatedCard>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}
