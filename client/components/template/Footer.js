import React from 'react';

const Footer = () => (
  <footer className="footer light-text">
    <div className="container grid">
      <div className="footer-links-column grid-item--one-fourth">
        <strong className="footer-links-column__title">
          A Footer Links List
        </strong>
        <ul className="footer-links-column__list">
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
        </ul>
      </div>
      <div className="footer-project grid-item--one-half">
        <p>
          <strong className="footer-links-column__title">
            GrapesShopper &ndash;
          </strong>{' '}
          An E-Commerce Platform
        </p>
        <p className="footer__by-line">
          by <a href="#">Kenneth Chen</a>, <a href="#">Marvin Huang</a>,&nbsp;
          <a href="#">Ziv Karmi</a>, and&nbsp;
          <a href="#">Adam Vare</a>
        </p>
      </div>
      <div className="footer-links-column grid-item--one-fourth">
        <strong className="footer-links-column__title">
          A Footer Links List
        </strong>
        <ul className="footer-links-column__list">
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
          <li className="footer-links-column__link">
            <a href="#">A footer link</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
