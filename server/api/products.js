const router = require('express').Router();
const {Product} = require('../db/models/');

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (e) {
    next(e);
  }
});
router.get('/:slug', async (req, res, next) => {
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

//GET SPECIFIC PRODUCT BY ID (used on frontend orderProducts page to get inventory)
//(this operation saves a whole other form set creation)
router.get('/product/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
