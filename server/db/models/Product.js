const Sequelize = require('sequelize');
const db = require('../db');

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
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'default-product.jpeg'
  },
  description: {
    type: Sequelize.TEXT
  },
  isPublished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Product.beforeValidate(product => {
  /*
   * Generate slug
   */
  if (!product.slug) {
    product.slug = product.name
      .replace(/\s/g, '-')
      .replace(/\W/g, '')
      .toLowerCase();
  } else {
    product.slug = product.slug.toLowerCase();
  }
});

function financial(x) {
  return Number(Number.parseFloat(x).toFixed(2));
}

Product.beforeValidate(product => {
  product.price = financial(product.price * 100);
});

module.exports = Product;
