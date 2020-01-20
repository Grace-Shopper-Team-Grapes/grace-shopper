import React from 'react';

const Carousel = () => (
  <div id="carousel">
    <div className="carousel__item carousel__item--one">
      <div className="carousel__content-container container">
        <div className="carousel__content">
          <h1 className="carousel__content-heading">A Carousel Item Heading</h1>
          <p className="carousel__content-text">
            This is a bunch of text belonging to a carousel item. We can have a
            normal button for usual cases, and two more states for different
            ones. Because we style blocks by class selectors with BEM, we can
            implement them using any tags we want
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Carousel;
