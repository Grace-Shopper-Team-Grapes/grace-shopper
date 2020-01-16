const User = require('./User');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Product = require('./Product');
const Category = require('./Category');

// One-to-One
Order.belongsTo(User);
Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);
Order.hasOne(Product);

// One-to-Many
User.hasMany(Order);

// Many-to-Many
Product.belongsToMany(Category, {through: 'CategoryProducts'});
Category.belongsToMany(Product, {through: 'CategoryProducts'});
Order.belongsToMany(Product, {through: OrderProduct});
Product.belongsToMany(Order, {through: OrderProduct});

//
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  OrderProduct,
  Product,
  Category
};
