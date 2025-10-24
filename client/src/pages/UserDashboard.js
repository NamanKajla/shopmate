"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const UserDashboard = () => {
  const { user, token } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <div className="user-info">
        <h2>Welcome, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
      </div>

      <div className="orders-section">
        <h2>Your Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item._id} className="order-item">
                      <span>{item.product?.name}</span>
                      <span>x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <p>Total: ${order.totalPrice.toFixed(2)}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
