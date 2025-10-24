"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

const Checkout = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage("Cart is empty")
      return
    }

    setLoading(true)
    try {
      const items = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }))

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Order placed successfully!")
        clearCart()
        setTimeout(() => navigate("/dashboard"), 2000)
      } else {
        setMessage(data.message || "Error placing order")
      }
    } catch (error) {
      setMessage("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="order-review">
          <h2>Order Review</h2>
          {cart.map((item) => (
            <div key={item._id} className="checkout-item">
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="checkout-total">
            <h3>Total: ${(getTotalPrice() + 10).toFixed(2)}</h3>
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment</h2>
          <p>Mock Payment Gateway</p>
          <p>This is a demo checkout. No real payment will be processed.</p>

          <button onClick={handleCheckout} disabled={loading} className="pay-btn">
            {loading ? "Processing..." : "Place Order"}
          </button>

          {message && (
            <p className={message.includes("successfully") ? "success-message" : "error-message"}>{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout
