import User from "../models/User.js"
import jwt from "jsonwebtoken"

const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" })
    }

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    user = await User.create({
      name,
      email,
      password,
    })

    const token = generateToken(user._id, user.isAdmin)

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" })
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = generateToken(user._id, user.isAdmin)

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
