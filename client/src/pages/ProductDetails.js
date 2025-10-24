"use client"

import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { CartContext } from "../context/CartContext"

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      const data = await response.json()
      if (data.success) {
        setProduct(data.product)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setMessage("Added to cart!")
    setTimeout(() => setMessage(""), 2000)
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.imageURL || "/placeholder.svg"} alt={product.name} />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="rating">Rating: {product.rating}/5</p>
        <p className="description">{product.description}</p>

        <div className="price-section">
          <h2 className="price">${product.price}</h2>
          <p className="stock">Stock: {product.stock}</p>
        </div>

        <div className="quantity-section">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="quantity-input"
          />
        </div>

        <button onClick={handleAddToCart} className="add-to-cart-btn" disabled={product.stock === 0}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  )
}

export default ProductDetails
