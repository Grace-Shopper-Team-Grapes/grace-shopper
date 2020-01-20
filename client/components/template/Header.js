import React from 'react';
import MainNav from './MainNav';

const Header = () => (
  <header id="header">
    <div className="header__row header__row--one container">
      <div id="logo">
        <a href="#">
          <span className="logo--grapes">Grapes</span>
          <span className="logo--shopper">Shopper</span>
        </a>
      </div>
      <div id="search">
        <form className="search__form">
          <input
            name="searchInput"
            type="text"
            className="search__input text__input"
          />
          <button
            type="submit"
            name="searchSubmit"
            className="search__submit btn"
          >
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
      <div id="quick-links">
        <ul className="quick-links__list">
          <li className="quick-links__item">
            <a href="#" className="quick-links__item-link">
              Login
            </a>
          </li>
          <li className="quick-links__item">
            <a href="#" className="quick-links__item-link">
              Signup
            </a>
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
    </div>
    <MainNav />
  </header>
);

export default Header;
