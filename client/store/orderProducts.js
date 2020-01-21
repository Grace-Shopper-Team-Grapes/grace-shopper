import axios from 'axios';

/*
 * ACTION TYPES
 */
const GOT_ALL_ORDER_PRODUCTS = 'GOT_ALL_ORDER_PRODUCTS';
const ADDED_ORDER_PRODUCT = 'ADD_ORDER_PRODUCT';
const UPDATED_ORDER_PRODUCT = 'UPDATED_ORDER_PRODUCT;';
const REMOVED_ORDER_PRODUCT = 'REMOVED_ORDER_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultDisplay = [];

/**
 * ACTION CREATORS
 */
const gotAllOrderProducts = orderProducts => {
  return {
    type: GOT_ALL_ORDER_PRODUCTS,
    orderProducts
  };
};
const addedOrderProduct = orderProducts => {
  return {
    type: ADDED_ORDER_PRODUCT,
    orderProducts
  };
};
const updatedOrderProduct = orderProducts => {
  return {
    type: UPDATED_ORDER_PRODUCT,
    orderProducts
  };
};
const removedOrderProduct = orderProducts => {
  return {
    type: REMOVED_ORDER_PRODUCT,
    orderProducts
  };
};

/**
 * THUNK CREATORS
 */
export const getAllOrderProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders');

    dispatch(gotAllOrderProducts(data.orderProducts));
  } catch (err) {
    console.error(err);
  }
};
export const addOrderProduct = (productId, productQty) => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', {
      productId,
      productQty
    });
    dispatch(addedOrderProduct(data));
  } catch (err) {
    console.error(err);
  }
};
export const updateOrderProduct = (productId, productQty) => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders', {
      productId,
      productQty
    });
    dispatch(updatedOrderProduct(data));
  } catch (err) {
    console.error(err);
  }
};
export const removeOrderProduct = productId => async dispatch => {
  try {
    const {data} = await axios.delete('/api/orders', {
      productId
    });
    dispatch(removedOrderProduct(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_ALL_ORDER_PRODUCTS:
    case ADDED_ORDER_PRODUCT:
    case UPDATED_ORDER_PRODUCT:
    case REMOVED_ORDER_PRODUCT:
      return action.orderProducts;
    default:
      return state;
  }
}
