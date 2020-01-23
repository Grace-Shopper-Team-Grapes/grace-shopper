const router = require('express').Router();
const {User, Order, OrderProduct, Product} = require('../db/models');
const {isLoggedIn, isAdmin} = require('./routeProtections');
module.exports = router;

// GET specific user or Admin user
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        attributes: {
          exclude: ['password', 'salt', 'createdAt', 'updatedAt']
        }
      });
      res.json(users);
    } else {
      const specificUser = await User.findByPk(req.user.id, {
        attributes: {
          exclude: ['password', 'salt']
        }
      });
      res.json(specificUser);
    }
  } catch (e) {
    next(e);
  }
});
//UPDATE ACCOUNT
router.put('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      let updated = await User.update(
        {...req.body},
        {
          where: {
            id: req.user.id
          }
        }
      );
      if (updated === 0) res.sendStatus(500);
      else {
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(304);
    }
  } catch (error) {
    next(error);
  }
});

// ADMIN ONLY BELOW
//
router.get('/admin', isAdmin, async (req, res, next) => {
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

// Admin can GET any user
router.get('/:id', isAdmin, async (req, res, next) => {
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

// Admin can GET any users' orders
router.get('/:id/orders', isAdmin, async (req, res, next) => {
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

// Admin can GET a specific order for a user
router.get('/:id/orders/:oid', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.oid
      },
      include: {
        model: OrderProduct
      }
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// User can edit account page
router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const updatedUser = await User.update(
      {...req.body},
      {
        where: {
          id: req.user.id
        }
      }
    );
    if (updatedUser) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
});

// Admin can edit any users' account page
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const updatedUser = await User.update(
      {...req.body},
      {
        where: {
          id: req.user.id
        }
      }
    );
    if (updatedUser) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
});
