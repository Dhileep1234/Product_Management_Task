const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Create Product
router.post('/addproduct', authenticateToken, async (req, res) => {
  const { name, price, category_id } = req.body;

  try {
    const category = await Category.findOne({ where: { id: category_id, user_id: req.user.id } });
    if (!category) return res.status(404).json({ error: 'Add Category not found or unauthorized' });

    const product = await Product.create({ name, price, category_id });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products for User
router.get('/getallproduct', authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        where: { user_id: req.user.id },
      },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Product by ID
router.get('/getproduct:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: { id },
      include: {
        model: Category,
        where: { user_id: req.user.id },
      },
    });

    if (!product) return res.status(404).json({ error: 'Get Product not found or unauthorized' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
router.delete('/deleteproduct:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: { id },
      include: {
        model: Category,
        where: { user_id: req.user.id },
      },
    });

    if (!product) return res.status(404).json({ error: 'Delete Product not found or unauthorized' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
