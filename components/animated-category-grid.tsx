"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge" // Reverted import
import {
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Home,
  Sofa,
  ChefHat,
  TreePine,
  Shirt,
  ShoppingBag,
  Watch,
  Footprints,
  Heart,
  Sparkles,
  Dumbbell,
  Activity,
  Book,
  Music,
  ChevronRight,
  Plus,
} from "lucide-react"
import { useState } from "react"

const iconMap: Record<string, any> = {
  smartphone: Smartphone,
  laptop: Laptop,
  headphones: Headphones,
  camera: Camera,
  home: Home,
  sofa: Sofa,
  kitchen: ChefHat,
  garden: TreePine,
  shirt: Shirt,
  shoes: Footprints,
  watch: Watch,
  bag: ShoppingBag,
  heart: Heart,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  activity: Activity,
  book: Book,
  music: Music,
}

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  pink: "from-pink-500 to-pink-600",
  orange: "from-orange-500 to-orange-600",
  indigo: "from-indigo-500 to-indigo-600",
  red: "from-red-500 to-red-600",
  yellow: "from-yellow-500 to-yellow-600",
}

interface AnimatedCategoryGridProps {
  categories: any[]
}

export function AnimatedCategoryGrid({ categories }: AnimatedCategoryGridProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Separate main categories and subcategories
  const mainCategories = categories.filter((cat) => cat.level === 0)
  const subcategories = categories.filter((cat) => cat.level > 0)

  const getSubcategories = (parentId: string) => {
    return subcategories.filter((sub) => sub.parent === parentId)
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="article-title text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find deals in your favorite categories with thousands of products
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mainCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Smartphone
            const colorClass = colorMap[category.color] || colorMap.blue
            const categorySubcategories = getSubcategories(category.id)
            const isExpanded = expandedCategory === category.id

            return (
              <AnimatedCard key={category.id} delay={index * 0.1} direction="up" className="group">
                <div className="p-6">
                  {/* Main Category */}
                  <Link href={`/category/${category.slug}`}>
                    <div className="text-center mb-4">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </motion.div>

                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {category.shortDescription || category.description}
                      </p>

                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {category.productCount || 0} deals
                        </Badge>
                        {categorySubcategories.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {categorySubcategories.length} subcategories
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Subcategories */}
                  {categorySubcategories.length > 0 && (
                    <div className="border-t pt-4">
                      <motion.button
                        className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Subcategories</span>
                        <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }}>
                          <Plus className="w-4 h-4" />
                        </motion.div>
                      </motion.button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-2">
                          {categorySubcategories.slice(0, 4).map((subcategory, subIndex) => (
                            <motion.div
                              key={subcategory.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.1 }}
                            >
                              <Link href={`/category/${subcategory.slug}`}>
                                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group/sub">
                                  <div
                                    className={`w-6 h-6 bg-gradient-to-br ${colorClass} rounded-md flex items-center justify-center`}
                                  >
                                    <IconComponent className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-sm font-medium group-hover/sub:text-primary transition-colors">
                                    {subcategory.name}
                                  </span>
                                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover/sub:text-primary transition-colors" />
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {categorySubcategories.length > 4 && (
                          <Link
                            href={`/category/${category.slug}`}
                            className="block text-xs text-primary hover:underline pt-2"
                          >
                            +{categorySubcategories.length - 4} more subcategories
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            )
          })}
        </div>

        {/* View All Categories Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/categories">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Categories
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
