const router = require('express').Router();
const {Order, Product} = require('../db/models');

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

module.exports = router;
