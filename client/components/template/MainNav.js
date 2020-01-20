import React from 'react';
import {NavLink} from 'react-router-dom';

const MainNav = () => (
  <div className="header__row header__row--two nav-bar container">
    <nav className="main-nav">
      <NavLink exact to="/" activeClassName="active" className="main-nav__item">
        Home
      </NavLink>
      <NavLink
        to="/products"
        activeClassName="active"
        className="main-nav__item"
      >
        Products
      </NavLink>
      <NavLink
        to="/categories"
        activeClassName="active"
        className="main-nav__item"
      >
        Categories
      </NavLink>
      <NavLink to="about" activeClassName="active" className="main-nav__item">
        About
      </NavLink>
    </nav>
  </div>
);

export default MainNav;
