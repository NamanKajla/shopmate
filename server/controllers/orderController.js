import Order from "../models/Order.js"
import Product from "../models/Product.js"

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" })
    }

    let totalPrice = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.productId)

      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.productId} not found` })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` })
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      })

      totalPrice += product.price * item.quantity

      // Reduce stock
      product.stock -= item.quantity
      await product.save()
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
    })

    res.status(201).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product")
    res.status(200).json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.product")
    res.status(200).json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" })
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    res.status(200).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
