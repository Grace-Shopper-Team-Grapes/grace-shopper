const router = require('express').Router();
const {User, Order, Product, OrderProduct} = require('../db/models');

const buildCartProducts = async orderId => {
  const allProducts = await Product.findAll({});
  const cartItems = await OrderProduct.findAll({
    where: {
      orderId
    }
  });

  // let cartProduct = {};
  let cartProductDetails = cartItems.map(orderProduct => {
    let thisProduct = {};
    allProducts.forEach(product => {
      if (product.id === orderProduct.productId) {
        thisProduct.id = product.id;
        thisProduct.name = product.name;
        thisProduct.slug = product.slug;
        thisProduct.imageUrl = product.imageUrl;
        thisProduct.price = orderProduct.price;
        thisProduct.quantity = orderProduct.quantity;
      }
    });
    return thisProduct;
  });

  return cartProductDetails;
};

// CART
// ----
// RESTful approach is to use GET, POST, PUT, and DELETE
// to View, Add, Edit, and Remove, respectfully.
// So:
// GET    / => VIEW Cart
// POST   / => ADD to Cart
// PUT    / => EDIT item in Cart
// DELETE / => REMOVE item from Cart

// Cart - View all items in Cart
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {
          userId: req.user.id,
          isPurchased: false
        }
      });
      const cartProducts = await buildCartProducts(userCart.id);
      res.json({userCart, orderProducts: cartProducts});
    } else {
      //sessions
      res.json(req.session.cart);
    }
  } catch (error) {
    next(error);
  }
});

// Cart - Add to cart
router.post('/', async (req, res, next) => {
  try {
    //IF NOT LOGGED IN:
    if (!req.user) {
      // {
      // userCart: order {
      //   dataValues: {
      //     id: 1,
      //     grandTotal: 20991,
      //     isPurchased: false,
      //     isShipped: false,
      //     createdAt: 2020-01-22T17:20:05.435Z,
      //     updatedAt: 2020-01-22T18:45:29.370Z,
      //     userId: 1,
      //     orderProducts: [Array]
      //   },

      // orderProducts: [
      //   {
      //     id: 1,
      //     name: 'Cabernet Sauvignon',
      //     slug: 'cabernet-sauvignon',
      //     imageUrl: 'https://media.winefolly.com/Cabernet-Sauvignon-wine-tasting-WineFolly.jpg',
      //     price: 2999,
      //     quantity: 6
      //   },
      //   {
      //     id: 2,
      //     name: 'Syrah',
      //     slug: 'syrah',
      //     imageUrl: 'https://media.winefolly.com/Syrah-wine-tasting-WineFolly.jpg',
      //     price: 999,
      //     quantity: 3
      //   }
      // ]
      // }
      const cart = req.session.cart; // an empty obj
      console.log(`the new age cart`, cart);
      const productId = req.body.productId;
      const productQty = req.body.productQty;
      const product = await Product.findByPk(productId);

      // Check inventory levels before adding to cart
      if (product.inventory >= productQty) {
        // Get cart
        //the cart either already lives on sessions
        //or it doesn't exist
        if (!cart.orderProducts) {
          // it does not exist, so create it.
          cart.orderProducts = [
            {
              id: product.id,
              name: product.name,
              slug: product.slug,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: productQty
            }
          ]; // an array of objs
        } else {
          //it does exist and we need to update it
          //loop through and see if you can find the same
          //productID

          for (let i = 0; i < cart.orderProducts.length; i++) {
            if (cart.orderProducts[i].id === productId) {
              cart.orderProducts[i].quantity = productQty;
              break;
            }
            //we went through the whole thing and it didn't exist
            //so add it
            cart.orderProducts.push({
              id: product.id,
              name: product.name,
              slug: product.slug,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: productQty
            });
          }
        }
        //ACCUMULATE GRAND TOTAL
        let grandTotal = 0;
        cart.orderProducts.forEach(orderProduct => {
          grandTotal += orderProduct.price * orderProduct.quantity;
        });
        //UPDATE ORDER GRANDTOTAL
        cart.grandTotal = grandTotal;
        console.log(`here is the sessionobj`, req.session);
        console.log(`THE OBJ:`, req.session.cart);
        res.json(req.session.cart);
      } else {
        //OTHERWISE WE'RE OUT OF THE PRODUCT
        throw new Error('Not enough product available.');
      }
    } else {
      //IF LOGGED IN:
      const productId = req.body.productId;
      const productQty = req.body.productQty;

      const product = await Product.findByPk(productId);

      const currentUser = req.user.id;

      // Check inventory levels before adding to cart
      if (product.inventory >= productQty) {
        // Get cart
        const userCart = await Order.findOne({
          where: {
            userId: currentUser,
            isPurchased: false
          },
          include: [{model: OrderProduct}]
        });

        //FIND OR CREATE ORDER PRODUCT
        await OrderProduct.findOrCreate({
          where: {orderId: userCart.id, productId},
          defaults: {
            orderId: userCart.id,
            productId,
            price: Number(product.price),
            quantity: Number(productQty)
          }
        }).spread(function(orderProduct, created) {
          if (!created) {
            orderProduct.update({
              quantity: Number(productQty) + orderProduct.quantity
            });
          }
        });

        //GET ALL ORDERPRODUCTS
        const allOrderProducts = await OrderProduct.findAll({
          where: {
            orderId: userCart.id
          }
        });

        //ACCUMULATE GRAND TOTAL
        let grandTotal = 0;
        allOrderProducts.forEach(orderProduct => {
          grandTotal += orderProduct.price * orderProduct.quantity;
        });

        //UPDATE ORDER GRANDTOTAL
        await userCart.update({
          grandTotal: grandTotal
        });

        const cartProducts = await buildCartProducts(userCart.id);
        console.log({userCart, orderProducts: cartProducts});
        res.json({userCart, orderProducts: cartProducts});
      } else {
        //OTHERWISE WE'RE OUT OF THE PRODUCT
        throw new Error('Not enough product available.');
      }
    }
  } catch (error) {
    next(error);
  }
});

// Cart - Edit Cart item
router.put('/', async (req, res, next) => {
  try {
    //IF NOT LOGGED IN:
    if (!req.user) {
      console.log(`req. sessions before`, req.sessions);
      const cart = req.session.cart;
      const productId = req.body.productId;
      const productQty = req.body.productQty;
      if (cart[productId]) {
        cart[productId] = +productQty;
      } else {
        cart[productId] = +productQty;
      }
      console.log(`req. sessions after`, req.sessions);

      res.sendStatus(200);
    } else {
      //IF LOGGED IN:
      const productId = req.body.productId;
      const productQty = req.body.productQty;
      const product = await Product.findByPk(productId);
      const currentUser = req.user.id;

      // Check inventory level for requested amount
      if (product.inventory >= productQty) {
        // Get Cart
        const userCart = await Order.findOne({
          where: {
            userId: currentUser,
            isPurchased: false
          },
          include: [{model: OrderProduct}]
        });

        userCart.orderProducts.map(item => {
          if (+item.productId === +productId) {
            item.quantity = +productQty;
            item.save();
          }
          return item;
        });

        const cartProducts = await buildCartProducts(userCart.id);

        res.json({userCart, orderProducts: cartProducts});
      }
    }
  } catch (error) {
    next(error);
  }
});

// Cart - Delete Cart item
router.delete('/', async (req, res, next) => {
  try {
    console.log('made it into route', req.body);
    const productId = +req.body.productId;
    const currentUser = req.user.id;
    // Get cart
    const userCart = await Order.findOne({
      where: {
        userId: currentUser,
        isPurchased: false
      }
    });

    // Delete item from cart
    OrderProduct.destroy({
      where: {
        orderId: +userCart.id,
        productId
      }
    });

    const cartProducts = await buildCartProducts(userCart.id);

    res.json({userCart, orderProducts: cartProducts});
  } catch (error) {
    next(error);
  }
});

// ======================
// Users - Order History

// Get a User's order history
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

//CHECKOUT
router.post('/checkout', async (req, res, next) => {
  try {
    //CHECK IF IN STOCK
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
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
      await Order.create({userId: req.user.id});

      //redirect below to a checkout confirmation page
      res.sendStatus(202);
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

// Admins - Order Management

// View all Orders

// View a Single Order
// - Note: Not necessary for MVP

// Ship a Single Order
// - Note: Not necessary for MVP
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

/*
The following code can be used to retrieve a model's association methods:
const model = Order;
for (let assoc of Object.keys(model.associations)) {
  for (let accessor of Object.keys(model.associations[assoc].accessors)) {
    console.log(
      model.name +
        '.' +
        model.associations[assoc].accessors[accessor] +
        '()'
    );
  }
}

The following is a list of Order model association methods:
order.getUser()
order.setUser()
order.createUser()
order.getOrderProducts()
order.setOrderProducts()
order.addOrderProducts()
order.addOrderProduct()
order.createOrderProduct()
order.removeOrderProduct()
order.removeOrderProducts()
order.hasOrderProduct()
order.hasOrderProducts()
order.countOrderProducts()
order.getProducts()
order.setProducts()
order.addProducts()
order.addProduct()
order.createProduct()
order.removeProduct()
order.removeProducts()
order.hasProduct()
order.hasProducts()
order.countProducts()
*/
