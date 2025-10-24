import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },
    imageURL: {
      type: String,
      default: "https://via.placeholder.com/300",
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Product", productSchema)
