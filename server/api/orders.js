const router = require('express').Router();
const {User, Order, Product, OrderProduct} = require('../db/models');
const {Sequelize} = require('sequelize');

router.post('/', async (req, res, next) => {
  try {
    const pid = req.body.pid;
    const pqty = req.body.pqty;
    const product = await Product.findByPk(pid);
    if (product.inventory > pqty) {
      res.json(product);
    }
  } catch (e) {
    next(e);
  }
});

router.put('/:pid/:pqty', async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const pqty = req.params.pqty;

    const product = await Product.findOne({
      where: {
        id: pid,
        inventory: {
          $lte: pqty
        }
      }
    });
    if (product) {
      res.json(pqty);
    } else {
      throw new Error('Not enough product available.');
    }
  } catch (e) {
    next(e);
  }
});

//CHECKOUT
router.get('/checkout/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    order.update({
      isPurchased: true
    });
    res.redirect('/products');
  } catch (error) {
    next(error);
  }
});

//SHIPPED
router.get('/ship/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    order.update({
      isShipped: true
    });
    res.redirect('/products');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
