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

// function financial(x) {
//   return Number(Number.parseFloat(x).toFixed(2));
// }

// OrderProduct.beforeValidate(orderProduct => {
//   console.log(`before ....`, orderProduct.price)
//   orderProduct.price = financial(orderProduct.price * 100);
//   console.log(`let's see the number: `, orderProduct.price)
// });

module.exports = OrderProduct;
