import axios from 'axios';
import history from '../history';

/*
 * ACTION TYPES
 */
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';
/**
 * INITIAL STATE
 */
const defaultDisplay = {};

/**
 * ACTION CREATORS
 */
const gotSingleProduct = product => {
  return {
    type: GOT_SINGLE_PRODUCT,
    product
  };
};

/**
 * THUNK CREATORS
 */
//FOR SLUGS
export const getSingleProduct = slug => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/' + slug);
    dispatch(gotSingleProduct(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
