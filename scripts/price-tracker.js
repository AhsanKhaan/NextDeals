import { Client } from "pg"

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

async function trackPrices() {
  try {
    await client.connect()

    // Get all active products
    const result = await client.query(
      "SELECT id, title, affiliate_url, current_price FROM products WHERE is_active = true",
    )

    const products = result.rows
    console.log(`Tracking prices for ${products.length} products...`)

    for (const product of products) {
      try {
        // In a real implementation, you would:
        // 1. Scrape the actual product page
        // 2. Extract the current price
        // 3. Compare with stored price
        // 4. Update if changed

        // For demo purposes, simulate price changes
        const priceChange = (Math.random() - 0.5) * 0.1 // ±5% change
        const newPrice = Math.round(product.current_price * (1 + priceChange) * 100) / 100

        // Update product price if changed
        if (Math.abs(newPrice - product.current_price) > 0.01) {
          await client.query("UPDATE products SET current_price = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [
            newPrice,
            product.id,
          ])

          // Record price history
          await client.query("INSERT INTO price_history (product_id, price) VALUES ($1, $2)", [product.id, newPrice])

          console.log(`Updated ${product.title}: $${product.current_price} → $${newPrice}`)
        }

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error tracking price for product ${product.id}:`, error)
      }
    }
  } catch (error) {
    console.error("Price tracking failed:", error)
  } finally {
    await client.end()
  }
}

// Run the price tracker
trackPrices()
