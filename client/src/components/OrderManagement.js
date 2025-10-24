"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const OrderManagement = ({ orders, onOrdersUpdated }) => {
  const { token } = useContext(AuthContext)
  const [message, setMessage] = useState("")

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Order status updated!")
        onOrdersUpdated()
        setTimeout(() => setMessage(""), 2000)
      } else {
        setMessage(data.message || "Error updating order")
      }
    } catch (error) {
      setMessage("Error: " + error.message)
    }
  }

  return (
    <div className="order-management">
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6)}</td>
                <td>{order.user?.name}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {message && <p className="form-message">{message}</p>}
    </div>
  )
}

export default OrderManagement
