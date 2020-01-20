import React from 'react';

const FeaturedCategories = () => (
  <div className="container">
    <div className="page-block feature-category-grid__container">
      <h2 className="page-block__title page-block__title--center">
        Shop By&hellip;
      </h2>
      <div className="feature-category-grid flex">
        <div className="feature-category-grid-item feature-category-grid-item--region grid-item--one-third">
          <p className="feature-category-grid-item__title">Featured Regions</p>
        </div>
        <div className="feature-category-grid-item feature-category-grid-item--region grid-item--one-third">
          <p className="feature-category-grid-item__title">Featured Regions</p>
        </div>
        <div className="feature-category-grid-item feature-category-grid-item--region grid-item--one-third">
          <p className="feature-category-grid-item__title">Featured Regions</p>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedCategories;
