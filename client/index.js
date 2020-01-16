import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';

// let's bring in our styles
import 'normalize.css/normalize.css';
import '../public/styles/main.scss';

// establishes socket connection
import './socket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
