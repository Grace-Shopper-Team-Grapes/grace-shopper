const router = require('express').Router();
const {Product} = require('../db/models/');

router
  .get('/', async (req, res, next) => {
    try {
      const allProducts = await Product.findAll();
      res.json(allProducts);
    } catch (e) {
      next(e);
    }
  })
  .get('/:slug', async (req, res, next) => {
    try {
      const singleProduct = await Product.findOne({
        where: {
          slug: req.params.slug
        }
      });
      res.json(singleProduct);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
