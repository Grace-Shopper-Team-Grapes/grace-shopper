const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    //since we are searching, editing, deleting by slug, these need to be unique
    unique: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    notEmpty: true
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'default-product.jpeg'
  },
  description: {
    type: Sequelize.TEXT
  },
  inStock: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  },
  isPublished: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  }
})

Product.beforeValidate(product => {
  /*
   * Generate slug
   */
  if (!product.slug) {
    product.slug = product.name
      .replace(/\s/g, '-')
      .replace(/\W/g, '')
      .toLowerCase()
  }
})

module.exports = Product
