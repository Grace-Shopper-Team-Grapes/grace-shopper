const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

// Get all users - ADMIN ONLY
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get individual user
router.get('/:id', async (req, res, next) => {
  try {
    const specificUser = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ['password', 'salt']
      }
    });
    res.json(specificUser);
  } catch (e) {
    next(e);
  }
});

// Get all orders by a user
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

// edit user
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
    // const specificUser = await User.findByPk(req.params.id);
    // if (updatedStatus === 0) res.sendStatus(500);
    // else {
    //   res.json(specificUser).status(202);
    // }
    if (updatedStatus === 0) res.sendStatus(500);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
