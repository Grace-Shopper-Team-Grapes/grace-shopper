import axios from 'axios';

/*
 * ACTION TYPES
 */
const GOT_RED_WINES = 'GOT_RED_WINES';

/**
 * INITIAL STATE
 */
const defaultDisplay = [];

/**
 * ACTION CREATORS
 */
const gotRedWines = redWines => {
  return {
    type: GOT_RED_WINES,
    redWines
  };
};

/**
 * THUNK CREATORS
 */
export const getRedWines = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products');
    dispatch(gotRedWines(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_RED_WINES:
      return action.redWines;
    default:
      return state;
  }
}
