// 
const express = require('express');
const sequelize = require('./config/db'); // Import Sequelize instance
const authRoutes = require('./routes/auth'); // Import your auth routes
const categoryRoutes  = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 5400,ip="192.168.31.102"; // Define the port you want to listen on


// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync Sequelize and Start Server
sequelize
  .sync() // Ensures all models are synchronized with the database
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on this port:${ip}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });
