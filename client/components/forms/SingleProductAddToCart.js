import React from 'react';
import {Link} from 'react-router-dom';

const SingleProductAddToCart = props => {
  // set our variables for easy printing
  const id = props.productId;
  const handleAddToCart = props.handleAddToCart;
  const handleQtyChange = props.handleQtyChange;
  const atcError = props.atcError;

  return (
    <div className="pd-add-to-cart__container">
      {atcError && <p className="error-msg">{atcError}</p>}
      <form
        className="pd-add-to-cart__form"
        onSubmit={e => handleAddToCart(e, id)}
      >
        <input
          type="text"
          className="pd-add-to-cart__quantity text__input text__input--center"
          defaultValue="1"
          onChange={handleQtyChange}
          name="quantity"
        />
        <button type="submit" className="pd-add-to-cart__submit">
          <i className="fas fa-cart-plus" /> Add to Cart
        </button>
      </form>
    </div>
  );
};

export default SingleProductAddToCart;
