const router = require('express').Router();
const {User, Order, Product, OrderProduct} = require('../db/models');

//GET ALL ORDERS
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(allOrders);
  } catch (error) {
    next(error);
  }
});

//ADD TO CART
router.post('/addToCart', async (req, res, next) => {
  try {
    const pid = req.body.pid;
    const pqty = req.body.pqty;
    const product = await Product.findByPk(pid);

    //BELOW LINE SHOULD BE UNCOMMENTED FOR LIVE VERSION OF SITE
    //AND FOR FRONT END TESTING
    //REALLY, SHOULD BE THIS WAY FROM NOW ON
    const currentUser = req.user.id;
    //FOR BACKEND TESTING, USE NEXT LINE INSTEAD OF ABOVE
    //const currentUser = req.body.testId;

    // CHECKS TO SEE IF THERE IS ENOUGH INVENTORY FOR REQUEST
    if (product.inventory >= pqty) {
      // GET CART
      const usersCart = await Order.findOne({
        where: {
          userId: currentUser,
          isPurchased: false
        }
      });

      //FIND OR CREATE ORDER PRODUCT
      await OrderProduct.findOrCreate({
        where: {orderId: usersCart.id, productId: pid},
        defaults: {
          orderId: usersCart.id,
          productId: pid,
          price: Number(product.price),
          quantity: Number(pqty)
        }
      }).spread(function(orderProduct, created) {
        if (!created) {
          orderProduct.update({
            //depending on implementation, either:
            //FOR FORM:
            quantity: Number(pqty)
            //OR other style:
            // quantity: Number(pqty) + orderProduct.quantity
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
      //OTHERWISE WE"RE OUT OF THE PRODUCT
      throw new Error('Not enough product available.');
    }
  } catch (error) {
    next(error);
  }
});

//CHECKOUT
router.get('/checkout/:userId', async (req, res, next) => {
  try {
    //req.user.id equivalent should be found on the frontend and then
    //put in on the frontend route.

    //CHECK IF IN STOCK
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPurchased: false
      }
    });
    const allProducts = await Product.findAll({});
    const allRespectiveOrderProducts = await OrderProduct.findAll({
      where: {
        orderId: order.id
      }
    });

    let allProductsWantedAvailable = true; //a flag
    const namesAndInventory = {}; //holds names and inventory
    allProducts.forEach(product => {
      namesAndInventory[product.name] = product.inventory; //gets entire arsenal
      allRespectiveOrderProducts.forEach(orderProduct => {
        if (product.id === orderProduct.productId) {
          if (orderProduct.quantity > product.inventory) {
            allProductsWantedAvailable = false;
          }
        }
      });
    });
    //IF ALL PRODUCTS WANTED ARE AVAILABLE
    if (allProductsWantedAvailable) {
      //NEED TO CHANGE INVENTORY OF PRODUCTS
      allProducts.forEach(product => {
        allRespectiveOrderProducts.forEach(orderProduct => {
          if (product.id === orderProduct.productId) {
            namesAndInventory[product.name] =
              namesAndInventory[product.name] - orderProduct.quantity;
          }
        });
      });

      allProducts.forEach(async product => {
        await product.update({
          inventory: namesAndInventory[product.name]
        });
      });

      //CHANGE ISPURCHASED STATUS
      await order.update({
        isPurchased: true
      });

      //Need a new order now with default properties
      await Order.create({userId: req.params.userId});

      //redirect below to a checkout confirmation page
      res.redirect('/products');
    } else {
      //BLOCK ORDER AND SEND ERROR

      for (let name in namesAndInventory) {
        if (namesAndInventory.hasOwnProperty(name)) {
          throw new Error(
            `\nthis product: ${name}, only has this much inventory: ${
              namesAndInventory[name]
            }`
          );
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

//SHIPPED (for admin only)
router.get('/ship/:orderId', async (req, res, next) => {
  try {
    //req.user.id equivalent should be found on the frontend.
    const order = await Order.findByPk(req.params.orderId);
    if (order.isPurchased) {
      await order.update({
        isShipped: true
      });
      //redirect below to an admin shipping confirmation page
      res.sendStatus(200);
    } else res.sendStatus(400);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
