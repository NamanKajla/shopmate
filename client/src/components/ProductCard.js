"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageURL || "/placeholder.svg"} alt={product.name} className="product-image" />
      </Link>

      <div className="product-card-content">
        <h3>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>

        <p className="category">{product.category}</p>

        <div className="product-footer">
          <span className="price">${product.price}</span>
          <span className="rating">★ {product.rating}</span>
        </div>

        <button onClick={() => addToCart(product)} className="add-btn" disabled={product.stock === 0}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
