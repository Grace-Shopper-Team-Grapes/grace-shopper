const router = require('express').Router();
const User = require('../db/models/User');
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');
const {isSignedUp} = require('../api/routeProtections');
const Product = require('../db/models/Product');
module.exports = router;
//below function is taken from orders
const buildCartProducts = async orderId => {
  const allProducts = await Product.findAll({});
  const cartItems = await OrderProduct.findAll({
    where: {
      orderId
    },
    order: [['createdAt', 'DESC']]
  });

  // let cartProduct = {};
  let cartProductDetails = cartItems.map(orderProduct => {
    let thisProduct = {};
    allProducts.forEach(product => {
      if (product.id === orderProduct.productId) {
        thisProduct.id = product.id;
        thisProduct.name = product.name;
        thisProduct.slug = product.slug;
        thisProduct.imageUrl = product.imageUrl;
        thisProduct.price = orderProduct.price;
        thisProduct.quantity = orderProduct.quantity;
      }
    });
    return thisProduct;
  });

  return cartProductDetails;
};

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password');
    } else {
      //you have a user account
      if (req.session.cart.orderProducts.length) {
        req.session.cart.orderProducts.forEach(async sessionOrderProduct => {
          const productId = +sessionOrderProduct.id;
          const productQty = +sessionOrderProduct.quantity;

          const product = await Product.findByPk(productId);

          const currentUser = req.user.id || req.body.special; //a special key used to merge sessioncart after login

          // Check inventory levels before adding to cart
          if (product.inventory >= productQty) {
            // Get cart
            const userCart = await Order.findOne({
              where: {
                userId: currentUser,
                isPurchased: false
              },
              include: [{model: OrderProduct}]
            });

            //FIND OR CREATE ORDER PRODUCT
            await OrderProduct.findOrCreate({
              where: {orderId: userCart.id, productId},
              defaults: {
                orderId: userCart.id,
                productId,
                price: Number(product.price),
                quantity: Number(productQty)
              }
            }).spread(async function(orderProduct, created) {
              if (!created) {
                await orderProduct.update({
                  quantity: Number(productQty) + orderProduct.quantity
                });
              }
            });

            //GET ALL ORDERPRODUCTS
            const allOrderProducts = await OrderProduct.findAll({
              where: {
                orderId: userCart.id
              }
            });

            //ACCUMULATE GRAND TOTAL
            let grandTotal = 0;
            allOrderProducts.forEach(orderProduct => {
              grandTotal += orderProduct.price * orderProduct.quantity;
            });

            //UPDATE ORDER GRANDTOTAL
            await userCart.update({
              grandTotal: grandTotal
            });

            const cartProducts = await buildCartProducts(userCart.id);

            res.json({userCart, orderProducts: cartProducts});
          }
        });
      }
      //otherwise we do not have a cart, so don't need to merge. let add tocart do its own thing.

      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', isSignedUp, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (req.session.cart.orderProducts.length) {
      const newCart = await Order.create({
        userId: user.id
      });

      req.session.cart.orderProducts.forEach(async orderProduct => {
        await OrderProduct.create({
          price: orderProduct.price,
          quantity: orderProduct.quantity,
          orderId: newCart.id,
          productId: orderProduct.id
        });
      });
    } else {
      const newCart = await Order.create({
        userId: user.id
      });
    }
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
