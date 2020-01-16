const router = require('express').Router();
const {User, Order, Product, OrderProduct} = require('../db/models');
const {Sequelize} = require('sequelize');

// Get all cart items
router.get('/', async (req, res, next) => {
  try {
    const id = req.user.id;
    const notPurchasedOrder = await Order.findOne({
      where: {
        userId: id,
        isPurchased: false
      },
      include: [
        {
          model: OrderProduct
        }
      ]
    });
    res.json(notPurchasedOrder);
  } catch (e) {
    next(e);
  }
});

// Add to cart
router.post('/', async (req, res, next) => {
  try {
    const pid = req.body.pid;
    const pqty = req.body.pqty;

    const product = await Product.findByPk(pid);
    if (product.inventory >= pqty) {
      const isLoggedIn = req.user.id;

      if (isLoggedIn) {
        const cart = await Order.findOne({
          where: {
            userId: isLoggedIn,
            isPurchased: false
          }
        });

        if (cart) {
          cart.grandTotal += product.price * pqty;
          const newOrderItem = await OrderProduct.create({
            price: product.price,
            quantity: pqty,
            orderId: cart.id,
            productId: pid
          });
        } else {
          const cart = await Order.create({
            where: {
              grandTotal: product.price * pqty
            }
          });
          const newOrderProduct = await OrderProduct.create({
            price: product.price,
            quantity: pqty,
            orderId: cart.id,
            productId: pid
          });
        }

        res.json(cart);
      }
    } else {
      throw new Error('Not enough product available.');
    }
  } catch (e) {
    next(e);
  }
});

// Edit cart items
router.put('/', async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const pqty = req.params.pqty;

    const product = await Product.findOne({
      where: {
        id: pid,
        inventory: {
          $gte: pqty
        }
      }
    });

    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      }
    });

    const orderProducts = await OrderProduct.findOne({
      where: {
        orderId: cart.id
      }
    });

    if (product) {
      let tempQty = orderProducts.quantity;
      orderProducts.quantity = pqty;
      cart.grandTotal += (pqty - tempQty) * orderProducts.price;
    } else {
      throw new Error('Not enough product available.');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
