import axios from 'axios';

/*
 * ACTION TYPES
 */
const GOT_ALL_CATEGORIES = 'GOT_ALL_CATEGORIES';

/**
 * INITIAL STATE
 */
const defaultDisplay = [];

/**
 * ACTION CREATORS
 */
const gotAllCategories = categories => {
  return {
    type: GOT_ALL_CATEGORIES,
    categories
  };
};

/**
 * THUNK CREATORS
 */
export const getAllCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/categories');
    dispatch(gotAllCategories(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
