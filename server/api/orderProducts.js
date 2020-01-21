const router = require('express').Router();
const {User, Order, Product, OrderProduct} = require('../db/models');

// RESTful approach is to use GET, POST, PUT, and DELETE
// to View, Add, Edit, and Remove, respectfully.
// So:
// GET    / => VIEW Cart
// POST   / => ADD to Cart
// PUT    / => EDIT item in Cart
// DELETE / => REMOVE item from Cart

//NEED ROUTES TO DELETE AND CHANGE ORDER PROUCTS

// View all items in Cart
router.get('/', async (req, res, next) => {
  try {
    // const order = await Order.findOne({
    //   where: {
    //     userId: req.user.id,
    //     isPurchased: false
    //   }
    // });
    // const allOrderProducts = await OrderProduct.findAll({
    //   where: {
    //     orderId: order.id
    //   }
    // });
    // res.json(allOrderProducts);
    const orderWithProducts = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: OrderProduct}]
    });
    res.json(orderWithProducts);
  } catch (error) {
    next(error);
  }
});

// Add to Cart
router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const productQty = req.body.productQty;
    const product = await Product.findByPk(productId);

    //BELOW LINE SHOULD BE UNCOMMENTED FOR LIVE VERSION OF SITE
    //AND FOR FRONT END TESTING
    //REALLY, SHOULD BE THIS WAY FROM NOW ON
    const currentUser = req.user.id;
    //FOR BACKEND TESTING, USE NEXT LINE INSTEAD OF ABOVE
    //const currentUser = req.body.testId;

    // CHECKS TO SEE IF THERE IS ENOUGH INVENTORY FOR REQUEST
    if (product.inventory >= productQty) {
      // GET CART
      const usersCart = await Order.findOne({
        where: {
          userId: currentUser,
          isPurchased: false
        }
      });

      //FIND OR CREATE ORDER PRODUCT
      await OrderProduct.findOrCreate({
        where: {orderId: usersCart.id, productId},
        defaults: {
          orderId: usersCart.id,
          productId,
          price: Number(product.price),
          quantity: Number(productQty) + quantity
        }
      }).spread(function(orderProduct, created) {
        if (!created) {
          orderProduct.update({
            //depending on implementation, either:
            //FOR FORM:
            quantity: Number(productQty)
            //OR other style:
            // quantity: Number(productQty) + orderProduct.quantity
          });
        }
      });

      //GET ALL ORDERPRODUCTS
      const allOrderProducts = await OrderProduct.findAll({
        where: {
          orderId: usersCart.id
        }
      });

      //ACCUMULATE GRAND TOTAL
      let grandTotal = 0;
      allOrderProducts.forEach(orderProduct => {
        grandTotal += orderProduct.price * orderProduct.quantity;
      });

      //UPDATE ORDER GRANDTOTAL
      await usersCart.update({
        grandTotal: grandTotal
      });
      res.json(200);
    } else {
      //OTHERWISE WE'RE OUT OF THE PRODUCT
      throw new Error('Not enough product available.');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const productQty = req.body.productQty;
    const product = await Product.findByPk(productId);
    const currentUser = req.user.id;

    // CHECKS TO SEE IF THERE IS ENOUGH INVENTORY FOR REQUEST
    if (product.inventory >= productQty) {
      // GET CART
      const usersCart = await Order.findOne({
        where: {
          userId: currentUser,
          isPurchased: false
        }
      });
      const upserted = await OrderProduct.upsert(
        {
          quantity: productQty
        },
        {
          where: {
            orderId: usersCart.id
          }
        }
      );
      res.json(upserted);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
