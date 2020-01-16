import axios from 'axios';
import history from '../history';

/*
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultDisplay = [];

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => {
  return {
    type: GOT_ALL_PRODUCTS,
    products
  };
};

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products');
    dispatch(gotAllProducts(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
