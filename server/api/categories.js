const router = require('express').Router();
const {Category} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({});
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const selectCategory = await Category.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.json(selectCategory);
  } catch (error) {
    next(error);
  }
});
