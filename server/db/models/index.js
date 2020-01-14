const User = require('./User');
const Address = require('./Address');
const Order = require('./Order');
const OrderLineItem = require('./OrderLineItem');
const Product = require('./Product');
const OrderStatus = require('./OrderStatus');
const ShippingMethod = require('./ShippingMethod');
const Category = require('./Category');

User.hasMany(Order);
User.hasMany(Address);
//Product.belongsToMany(OrderLineItem);
Category.hasMany(Product);
Order.belongsTo(User);
Order.hasOne(Address);
Order.hasOne(OrderStatus);
Order.hasMany(OrderLineItem);
Order.hasOne(ShippingMethod);
OrderLineItem.hasOne(Product);
OrderLineItem.belongsTo(Order);
Order.hasOne(Product);
OrderStatus.belongsTo(Order);
ShippingMethod.belongsTo(Order);
Address.belongsTo(User);
Address.belongsTo(Order);
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
  User
};
