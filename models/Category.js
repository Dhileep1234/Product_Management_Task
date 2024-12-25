const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
});

Category.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Category, { foreignKey: 'user_id' });

module.exports = Category;
