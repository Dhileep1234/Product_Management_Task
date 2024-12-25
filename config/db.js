const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('product_management', 'root', 'Dhileep@1234', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
//   .then(() => console.log('Database connected successfully.'))
  .then(() => console.log('Connection to the database has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err.message));

module.exports = sequelize;
