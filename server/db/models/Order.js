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
function financial(x) {
  return Number(Number.parseFloat(x).toFixed(2));
}

Order.beforeValidate(order => {
  order.grandTotal = financial(order.grandTotal * 100);
});

module.exports = Order;
