const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single category by ID
router.get('/:id', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Get products in this category
    const [products] = await db.query('SELECT * FROM products WHERE category_id = ?', [req.params.id]);

    res.json({ ...categories[0], products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
