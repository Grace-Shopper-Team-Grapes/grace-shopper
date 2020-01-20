import axios from 'axios';

/*
 * ACTION TYPES
 */
const GOT_ALL_ORDER_PRODUCTS = 'GOT_ALL_ORDER_PRODUCTS';

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

/**
 * THUNK CREATORS
 */
export const getAllOrderProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orderProducts');
    dispatch(gotAllOrderProducts(data));
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
      return action.orderProducts;
    default:
      return state;
  }
}
