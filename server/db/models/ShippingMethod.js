const Sequelize = require('sequelize');
const db = require('../db');

const ShippingMethod = db.define('shippingMethod', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  deliveryEstimate: {
    type: Sequelize.STRING
  }, 
  cost: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.00
  }
});


module.exports = ShippingMethod;