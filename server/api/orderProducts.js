const router = require('express').Router();
const {User, Order, Product, OrderProduct} = require('../db/models');

//GET ALL ORDERPRODUCTS
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isShipped: false
      }
    });
    const allOrderProducts = await OrderProduct.findAll({
      where: {
        orderId: order.id
      }
    });
    res.json(allOrderProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
