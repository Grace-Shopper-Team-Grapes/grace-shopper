const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  grandTotal: {
    type: Sequelize.INTEGER,
    allowNull: false
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

Order.beforeValidate = order => {
  order.price = order.price * 100;
};

module.exports = Order;
