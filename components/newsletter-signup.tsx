"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button" // Reverted import
import { Input } from "@/components/ui/input" // Reverted import
import { Card, CardContent } from "@/components/ui/card" // Reverted import
import { Mail, CheckCircle, AlertCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail("")
        setFirstName("")
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-12">
        <Card className="max-w-2xl mx-auto text-center bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-green-800 dark:text-green-200">Welcome to DealScope!</h3>
            <p className="text-green-700 dark:text-green-300">
              You'll receive our best deals and exclusive offers straight to your inbox.
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="py-12">
      <Card className="max-w-2xl mx-auto text-center bg-primary/5 border-primary/20">
        <CardContent className="p-8">
          <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="article-title text-2xl font-bold mb-2">Never Miss a Deal</h3>
          <p className="text-muted-foreground mb-6">
            Get exclusive deals, price alerts, and expert recommendations delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">No spam, unsubscribe anytime. We respect your privacy.</p>
        </CardContent>
      </Card>
    </section>
  )
}
