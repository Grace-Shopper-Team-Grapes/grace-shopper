import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props;

  return (
    <div>
      <h2>
        {' '}
        <Link to="/products/">All Products</Link>
      </h2>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
