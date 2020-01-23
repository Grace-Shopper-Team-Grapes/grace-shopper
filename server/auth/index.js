const router = require('express').Router();
const User = require('../db/models/User');
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');
const {isSignedUp} = require('../api/routeProtections');
module.exports = router;

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
        const existingCart = await Order.findOne({
          where: {
            userId: user.id
          }
        });

        const existingOrderProducts = await OrderProduct.findAll({
          where: {
            orderId: existingCart.id
          }
        });
        //now we have all the orderProducts

        const mergedArray = [];

        existingOrderProducts.forEach(existingOrderProduct => {
          req.session.cart.orderProducts.forEach(sessionOrderProduct => {
            if (
              existingOrderProduct.productId === sessionOrderProduct.productId
            ) {
              const newQuantity =
                existingOrderProduct.quantity + sessionOrderProduct.quantity;
              existingOrderProduct.quantity = newQuantity;
              mergedArray.push(existingOrderProduct);
            }
          });
          mergedArray.push(existingOrderProduct);
        });

        // mergedArray.forEach(async (orderProduct) => {
        //   await OrderProduct.update({
        //     orderProduct
        //   },
        //   {

        //   })
        // })
        await OrderProduct.update(
          {
            mergedArray
          },
          {
            where: {
              orderId: existingOrderProducts.orderId,
              isPurchased: false
            }
          }
        );
      }

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
