import axios from 'axios';

/**
 * ACTION TYPES
 */
const GOT_ACCOUNT = 'GOT_ACCOUNT';

/**
 * INITIAL STATE
 */
const defaultDisplay = {};

/**
 * ACTION CREATORS
 */
const gotAccount = account => ({type: GOT_ACCOUNT, account});

/**
 * THUNK CREATORS
 */
//ROUTE USES REQ.USER FOR SPECIFICITY
export const getAccount = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/');
    dispatch(gotAccount(data));
  } catch (err) {
    console.error(err);
  }
};
export const updateAccount = updateObj => {
  return async dispatch => {
    try {
      await axios.put('/api/users/', updateObj);
      const {data} = await axios.get('/api/users/');
      dispatch(gotAccount(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = defaultDisplay, action) {
  switch (action.type) {
    case GOT_ACCOUNT:
      return action.account;
    default:
      return state;
  }
}
