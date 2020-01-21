import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  HomePage,
  Login,
  Signup,
  UserHome,
  DisplayAllProducts,
  DisplayCategories,
  DisplayWhiteWines,
  DisplayRedWines,
  DisplaySingleProduct,
  DisplayAllOrderProducts
} from './components';
import {me} from './store';
import Homepage from './components/page/Homepage';
import DisplayAccountPage from './components/DisplayAccountPage';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/products/:slug" component={DisplaySingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products" component={DisplayAllProducts} />
        <Route path="/categories/white" component={DisplayWhiteWines} />
        <Route path="/categories/red" component={DisplayRedWines} />
        <Route path="/categories" component={DisplayCategories} />
        <Route path="/orderProducts" component={DisplayAllOrderProducts} />
        <Route path="/account" component={DisplayAccountPage} />

        <Route path="/" exact component={Homepage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Removing this -- ZK */}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
