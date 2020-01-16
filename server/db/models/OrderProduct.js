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

// NEED A INSTANCE METHOD TO GRAB THE PRODUCT PRICE AT CREATION

OrderProduct.beforeValidate = orderProduct => {
  orderProduct.price = orderProduct.price * 100;
};

module.exports = OrderProduct;
