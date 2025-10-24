"use client"

import { useContext } from "react"
import { CartContext } from "../context/CartContext"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext)

  return (
    <div className="cart-item">
      <img src={item.imageURL || "/placeholder.svg"} alt={item.name} className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
        <input type="number" value={item.quantity} readOnly className="quantity-display" />
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
      </div>

      <div className="cart-item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button onClick={() => removeFromCart(item._id)} className="remove-btn">
        Remove
      </button>
    </div>
  )
}

export default CartItem
