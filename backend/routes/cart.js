const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get cart items for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const [cartItems] = await db.query(
      `SELECT c.*, p.title, p.price, p.image 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.session_id = ?`,
      [req.params.sessionId]
    );
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    // Check if item already exists in cart
    const [existing] = await db.query(
      'SELECT * FROM cart WHERE session_id = ? AND product_id = ?',
      [sessionId, productId]
    );

    if (existing.length > 0) {
      // Update quantity
      await db.query(
        'UPDATE cart SET quantity = quantity + ? WHERE session_id = ? AND product_id = ?',
        [quantity, sessionId, productId]
      );
    } else {
      // Insert new item
      await db.query(
        'INSERT INTO cart (session_id, product_id, quantity) VALUES (?, ?, ?)',
        [sessionId, productId, quantity]
      );
    }

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    await db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, req.params.id]);
    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart for session
router.delete('/session/:sessionId', async (req, res) => {
  try {
    await db.query('DELETE FROM cart WHERE session_id = ?', [req.params.sessionId]);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
