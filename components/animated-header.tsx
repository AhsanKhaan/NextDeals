"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Search, X, ShoppingBag, Bell } from "lucide-react"
import { Button } from "@/components/ui/button" // Reverted import
import { Input } from "@/components/ui/input" // Reverted import
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge" // Reverted import
import {
  // Reverted imports
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = [
  {
    name: "Electronics",
    href: "/category/electronics",
    subcategories: [
      { name: "Smartphones", href: "/category/smartphones" },
      { name: "Laptops", href: "/category/laptops" },
      { name: "Headphones", href: "/category/headphones" },
      { name: "Cameras", href: "/category/cameras" },
    ],
  },
  {
    name: "Home & Garden",
    href: "/category/home-garden",
    subcategories: [
      { name: "Furniture", href: "/category/furniture" },
      { name: "Kitchen", href: "/category/kitchen" },
      { name: "Garden", href: "/category/garden" },
      { name: "Decor", href: "/category/decor" },
    ],
  },
  {
    name: "Fashion",
    href: "/category/fashion",
    subcategories: [
      { name: "Clothing", href: "/category/clothing" },
      { name: "Shoes", href: "/category/shoes" },
      { name: "Accessories", href: "/category/accessories" },
      { name: "Watches", href: "/category/watches" },
    ],
  },
  {
    name: "Health & Beauty",
    href: "/category/health-beauty",
    subcategories: [
      { name: "Skincare", href: "/category/skincare" },
      { name: "Makeup", href: "/category/makeup" },
      { name: "Wellness", href: "/category/wellness" },
      { name: "Fitness", href: "/category/fitness" },
    ],
  },
]

export function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b shadow-lg"
          : "bg-background/95 backdrop-blur-sm border-b"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag className="h-6 w-6 text-white" />
              </motion.div>
              <span className="article-title text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DealScope
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {categories.map((category, index) => (
                  <NavigationMenuItem key={category.name}>
                    <NavigationMenuTrigger className="text-sm font-medium">{category.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <motion.div
                        className="grid w-[400px] gap-3 p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href={category.href}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">{category.name}</div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Explore all {category.name.toLowerCase()} deals
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        <div className="grid gap-2">
                          {category.subcategories.map((sub) => (
                            <NavigationMenuLink key={sub.name} asChild>
                              <Link
                                href={sub.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{sub.name}</div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </motion.div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input placeholder="Search deals..." className="w-64 hidden sm:block" autoFocus />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                    <Search className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                3
              </Badge>
            </motion.div>

            <ThemeToggle />

            {/* Mobile Menu */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-4 space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Input placeholder="Search deals..." className="flex-1" />
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={category.href}
                      className="block py-3 text-lg font-medium border-b hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    <div className="ml-4 mt-2 space-y-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
