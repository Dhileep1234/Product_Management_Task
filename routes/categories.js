const express = require('express');
const jwt = require('jsonwebtoken');
const Category = require('../models/Category');
const User = require('../models/User'); // If you need to check user info
const authenticateToken = require('../middleware/authMiddleware'); // JWT authentication middleware

const router = express.Router();

// Middleware to verify the user's JWT token
router.use(authenticateToken);

// Create a new category (authenticated users only)
router.post('/addcategories', async (req, res) => {
  const { name } = req.body;
  const user_id = req.user.id; // User from the JWT token

  try {
    // Create the category and associate it with the user
    const category = await Category.create({ name, user_id });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all categories created by the logged-in user
router.get('/getcategories', async (req, res) => {
  const user_id = req.user.id; // User from the JWT token
  
  try {
    // Fetch all categories where user_id matches the logged-in user
    const categories = await Category.findAll({ where: { user_id } });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a category (only if it belongs to the logged-in user)
router.delete('/deletecategories:id', async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id; // User from the JWT token
  
  try {
    // Find the category by ID and ensure it belongs to the logged-in user
    const category = await Category.findOne({ where: { id, user_id } });
    
    if (!category) {
      return res.status(403).json({ message: 'You do not have permission to delete this category.' });
    }

    // Delete the category
    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;