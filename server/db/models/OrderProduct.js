const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('orderProduct', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
});

module.exports = OrderProduct;
