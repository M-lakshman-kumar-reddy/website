import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../utils/api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await getOrder(orderNumber);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="error-page">
        <div className="container">
          <h1>Order Not Found</h1>
          <p>We couldn't find an order with this number.</p>
          <Link to="/" className="btn-primary">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">Thank you for your order. We've received it and will process it shortly.</p>
        </div>

        <div className="order-details">
          <div className="order-info-section">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Order Number:</label>
                <span className="order-number">{order.order_number}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="info-item">
                <label>Order Date:</label>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <label>Total Amount:</label>
                <span className="total-amount">${parseFloat(order.total_amount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="shipping-info-section">
            <h2>Shipping Information</h2>
            <div className="info-grid">
              <div className="info-item full-width">
                <label>Name:</label>
                <span>{order.customer_name}</span>
              </div>
              <div className="info-item full-width">
                <label>Email:</label>
                <span>{order.customer_email}</span>
              </div>
              <div className="info-item full-width">
                <label>Phone:</label>
                <span>{order.customer_phone}</span>
              </div>
              <div className="info-item full-width">
                <label>Address:</label>
                <span>{order.shipping_address}</span>
              </div>
              <div className="info-item">
                <label>City:</label>
                <span>{order.city}</span>
              </div>
              <div className="info-item">
                <label>State:</label>
                <span>{order.state}</span>
              </div>
              <div className="info-item">
                <label>Zip Code:</label>
                <span>{order.zip_code}</span>
              </div>
              <div className="info-item">
                <label>Country:</label>
                <span>{order.country}</span>
              </div>
            </div>
          </div>

          <div className="order-items-section">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items && order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">Price: ${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <div className="item-total">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-secondary">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
