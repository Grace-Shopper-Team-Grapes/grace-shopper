const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

router.get('/:id/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/orders/:oid', async (req, res, next) => {
  try {
    const specificOrder = await Order.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(specificOrder);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedStatus = await User.update(
      {
        phone: req.body.phone
      },
      {where: {id: req.params.id}}
    );
    //if we choose to send back updated User with new
    //phone number
    // const specificUser = await User.findById(req.params.id);
    // if (updatedStatus === 0) res.sendStatus(500);
    // else {
    //   res.json(specificUser);
    // }
    if (updatedStatus) res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
