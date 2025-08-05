"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // Reverted import
import { Badge } from "@/components/ui/badge" // Reverted import
import { FloatingElements } from "@/components/ui/floating-elements"
import { LottieAnimation } from "@/components/ui/lottie-animation"
import { CountUpAnimation } from "@/components/ui/count-up-animation"
import { ArrowRight, Sparkles } from "lucide-react"

export function AnimatedHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <FloatingElements />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Over 10,000 deals tracked daily
                </Badge>
              </motion.div>

              <motion.h1
                className="article-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Smart Shopping
                <br />
                <motion.span
                  className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Made Simple
                </motion.span>
              </motion.h1>

              <motion.p
                className="article-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover the best deals across all categories with expert reviews, price tracking, and personalized
                recommendations.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button size="lg" className="text-lg px-8 py-3 group">
                  Browse Deals
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  Price Alerts
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <div className="text-2xl font-bold text-primary">
                    <CountUpAnimation end={50} suffix="K+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Products Tracked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    <CountUpAnimation end={95} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Price Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    <CountUpAnimation end={1} suffix="M+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Users</div>
                </div>
              </motion.div>
            </div>

            {/* Right Animation */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-80 md:w-96 md:h-96"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <LottieAnimation className="w-full h-full" loop={true} autoplay={true} />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  50% OFF
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  Free Shipping
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
