const Sequelize = require('sequelize');
const db = require('../db');

const OrderStatus = db.define('orderStatus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  }
});

module.exports = OrderStatus;
