import axios from 'axios';

/*
 * ACTION TYPES
 */
const GOT_WHITE_WINES = 'GOT_WHITE_WINES';

/**
 * INITIAL STATE
 */
const defaultDisplay = [];

/**
 * ACTION CREATORS
 */
const gotWhiteWines = whiteWines => {
  return {
    type: GOT_WHITE_WINES,
    whiteWines
  };
};

/**
 * THUNK CREATORS
 */
export const getWhiteWines = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products');
    dispatch(gotWhiteWines(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_WHITE_WINES:
      return action.whiteWines;
    default:
      return state;
  }
}
