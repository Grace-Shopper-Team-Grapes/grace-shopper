import React from 'react';
import {Link} from 'react-router-dom';

const QuickLinks = () => (
  <div id="quick-links">
    <ul className="quick-links__list">
      <li className="quick-links__item">
        <Link to="/login" className="quick-links__item-link">
          Login
        </Link>
      </li>
      <li className="quick-links__item">
        <Link to="/signup" className="quick-links__item-link">
          Signup
        </Link>
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
          Cart (0)
        </a>
      </li>
    </ul>
  </div>
);

export default QuickLinks;
