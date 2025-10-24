"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import CartItem from "../components/CartItem"

const Cart = () => {
  const { cart, getTotalPrice } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>$10.00</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(getTotalPrice() + 10).toFixed(2)}</span>
        </div>

        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart
