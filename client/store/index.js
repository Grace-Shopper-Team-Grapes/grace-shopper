import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import products from './products';
import singleProduct from './singleProduct';
import orderProducts from './orderProducts';
import categories from './categories';
import redWines from './redWines';
import whiteWines from './whiteWines';

const reducer = combineReducers({
  user,
  products,
  product: singleProduct,
  orderProducts,
  categories,
  redWines,
  whiteWines
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './singleProduct';
export * from './orderProducts';
export * from './categories';
export * from './redWines';
export * from './whiteWines';
