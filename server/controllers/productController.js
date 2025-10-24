import Product from "../models/Product.js"

export const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query

    const filter = {}

    if (search) {
      filter.name = { $regex: search, $options: "i" }
    }

    if (category) {
      filter.category = category
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const skip = (page - 1) * limit
    const products = await Product.find(filter).skip(skip).limit(Number(limit))
    const total = await Product.countDocuments(filter)

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }

    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageURL, stock, rating } = req.body

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" })
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageURL,
      stock,
      rating,
    })

    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
