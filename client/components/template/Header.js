import React from 'react';
import MainNav from './MainNav';
import {Link} from 'react-router-dom';
import QuickLinks from './QuickLinks';

const Header = () => (
  <header id="header">
    <div className="header__row header__row--one container">
      <div id="logo">
        <Link to="/">
          <span className="logo--grapes">Grapes</span>
          <span className="logo--shopper">Shopper</span>
        </Link>
      </div>
      <div id="search">
        <form className="search__form" name="searchForm">
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
      <QuickLinks />
    </div>
    <MainNav />
  </header>
);

export default Header;
