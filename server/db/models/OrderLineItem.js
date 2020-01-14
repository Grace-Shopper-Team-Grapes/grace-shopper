const Sequelize = require('sequelize');
const db = require('../db');

const OrderLineItem = db.define('orderLineItem', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    notEmpty: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
});

// NEED A INSTANCE METHOD TO GRAB THE PRODUCT PRICE AT CREATION

module.exports = OrderLineItem;