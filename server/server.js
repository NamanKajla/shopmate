import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import orderRoutes from "./routes/orders.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors({ origin: "*" }))
app.use(express.json())

// Connect to database
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
