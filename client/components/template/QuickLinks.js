import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../store';

const QuickLinks = ({handleClick, isLoggedIn}) => (
  <div id="quick-links">
    <ul className="quick-links__list">
      <li className="quick-links__item">
        {isLoggedIn ? (
          <div>
            <a
              className="quick-links__item-link"
              href="#"
              onClick={handleClick}
            >
              Logout
            </a>
          </div>
        ) : (
          <Link to="/login" className="quick-links__item-link">
            Login
          </Link>
        )}
      </li>
      <li className="quick-links__item">
        {isLoggedIn ? (
          <Link to="/account" className="quick-links__item-link">
            My Account
          </Link>
        ) : (
          <Link to="/signup" className="quick-links__item-link">
            Signup
          </Link>
        )}
      </li>
      <li className="quick-links__item">
        <a
          onClick={() => {
            document
              .getElementById('cart-modal-mask')
              .style.setProperty('display', 'flex', 'important');
          }}
          href="#"
          className="quick-links__item-link"
        >
          {/* How can I get the Redux Store for orderProducts here so I can get the length of orderProducts[]? */}
          Cart (0)
        </a>
      </li>
    </ul>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(QuickLinks);

/**
 * PROP TYPES
 */
QuickLinks.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
