import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../store';

const QuickLinks = ({handleClick, isLoggedIn, fullCart}) => (
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
            // get cart modal overlay
            const cartModal = document.getElementById('cart-modal-mask');
            // show it
            cartModal.style.setProperty('display', 'flex', 'important');

            // create our event handler for closing the cart
            // this will allow us to close on overlay mask click, or
            // on pressing the Escape key
            const closeCart = event => {
              if (
                (event.keyCode === 27 && event.type === 'keydown') ||
                (event.type === 'click' &&
                  event.target.id === 'cart-modal-mask')
              ) {
                // hide cart and destroy listeners
                cartModal.style.setProperty('display', 'none', '');
                document.removeEventListener('keydown', closeCart);
                cartModal.removeEventListener('click', closeCart);
              }
            };

            // set up our event handlers
            document.addEventListener('keydown', closeCart);
            cartModal.addEventListener('click', closeCart);
          }}
          href="#"
          className="quick-links__item-link quick-links__cart"
        >
          {/* How can I get the Redux Store for orderProducts here so I can get the length of orderProducts[]? */}
          Cart{' '}
          <span className="quick-links__cart-size">
            (
            {fullCart.reduce((acc, curr) => {
              acc += curr.quantity;
              return acc;
            }, 0)}
            )
          </span>
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
    isLoggedIn: !!state.user.id,
    fullCart: state.orderProducts
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
