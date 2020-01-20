const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  grandTotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isShipped: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Order;
