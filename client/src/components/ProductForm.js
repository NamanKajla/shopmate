"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const ProductForm = ({ onProductAdded }) => {
  const { token } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageURL: "",
    stock: "",
    rating: "",
  })
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Product added successfully!")
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          imageURL: "",
          stock: "",
          rating: "",
        })
        onProductAdded()
        setTimeout(() => setMessage(""), 2000)
      } else {
        setMessage(data.message || "Error adding product")
      }
    } catch (error) {
      setMessage("Error: " + error.message)
    }
  }

  return (
    <div className="product-form">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="form-input">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} className="form-input" />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  )
}

export default ProductForm
