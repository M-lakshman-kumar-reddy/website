const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create new order
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      zipCode,
      country,
      items,
      totalAmount
    } = req.body;

    // Generate order number
    const orderNumber = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    // Insert order
    const [result] = await db.query(
      `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, 
       shipping_address, city, state, zip_code, country, total_amount, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [orderNumber, customerName, customerEmail, customerPhone, shippingAddress, 
       city, state, zipCode, country, totalAmount]
    );

    const orderId = result.insertId;

    // Insert order items
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    res.json({ orderNumber, orderId, status: 'pending' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE order_number = ?',
      [req.params.orderNumber]
    );

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const [items] = await db.query(
      `SELECT oi.*, p.title, p.image 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [orders[0].id]
    );

    res.json({ ...orders[0], items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
