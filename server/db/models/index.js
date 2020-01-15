const User = require('./User');
const Address = require('./Address');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Product = require('./Product');
const OrderStatus = require('./OrderStatus');
const Category = require('./Category');

User.hasMany(Order);
User.hasMany(Address, {as: 'Shipping'});
User.hasMany(Address, {as: 'Billing'});
//Product.belongsToMany(OrderProduct);
Category.hasMany(Product);

// One-to-One
Order.belongsTo(User);
Order.belongsTo(Address);
Order.hasOne(OrderStatus);
Order.hasMany(OrderProduct);
Order.hasOne(ShippingMethod);
OrderProduct.hasOne(Product);
OrderProduct.belongsTo(Order);
Order.hasOne(Product);

OrderStatus.belongsTo(Order);

// One-to-Many
User.hasMany(Order);
User.belongsTo(Address, {as: 'defaultShipping'});
User.belongsTo(Address, {as: 'defaultBilling'});

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
  Address,
  Order,
  OrderProduct,
  Product,
  OrderStatus,
  Category
};
