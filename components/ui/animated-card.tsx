"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card" // Reverted import
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  hover?: boolean
}

export function AnimatedCard({ children, className, delay = 0, direction = "up", hover = true }: AnimatedCardProps) {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  }

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={
        hover
          ? {
              y: -8,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      className={cn("w-full", className)}
    >
      <Card className="h-full overflow-hidden bg-gradient-to-br from-background to-muted/20 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {children}
      </Card>
    </motion.div>
  )
}
