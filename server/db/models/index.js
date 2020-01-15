const User = require('./User');
const Address = require('./Address');
const Order = require('./Order');
const OrderLineItem = require('./OrderLineItem');
const Product = require('./Product');
const OrderStatus = require('./OrderStatus');
const Category = require('./Category');

// One-to-One
Order.belongsTo(User);
Order.belongsTo(Address);
Order.hasOne(OrderStatus);
OrderStatus.belongsTo(Order);

// One-to-Many
User.hasMany(Order);
User.belongsTo(Address, {as: 'defaultShipping'});
User.belongsTo(Address, {as: 'defaultBilling'});

// Many-to-Many
Product.belongsToMany(Category, {through: 'CategoryProducts'});
Category.belongsToMany(Product, {through: 'CategoryProducts'});
Order.belongsToMany(Product, {through: OrderLineItem});
Product.belongsToMany(Order, {through: OrderLineItem});

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
  OrderLineItem,
  Product,
  OrderStatus,
  Category
};
