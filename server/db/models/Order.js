const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  grandTotal: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Order
