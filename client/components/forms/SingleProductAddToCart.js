import React from 'react';
import {Link} from 'react-router-dom';

import {useToasts} from 'react-toast-notifications';

const SingleProductAddToCart = props => {
  const {addToast} = useToasts();
  // set our variables for easy printing
  const id = props.product.id;
  const name = props.product.name;
  const handleAddToCart = props.handleAddToCart;
  const handleQtyChange = props.handleQtyChange;
  const atcError = props.atcError;

  return (
    <div className="pd-add-to-cart__container">
      {atcError && <p className="error-msg">{atcError}</p>}
      <form
        className="pd-add-to-cart__form"
        onSubmit={e => {
          handleAddToCart(e, id);
          addToast(
            `Added ${name} x${+document.getElementById(
              'single-product-quantity'
            ).value} to your Cart!`,
            {
              appearance: 'success'
            }
          );
        }}
      >
        <input
          type="text"
          className="pd-add-to-cart__quantity text__input text__input--center"
          defaultValue="1"
          onChange={handleQtyChange}
          id="single-product-quantity"
        />
        <button type="submit" className="pd-add-to-cart__submit">
          <i className="fas fa-cart-plus" /> Add to Cart
        </button>
      </form>
    </div>
  );
};

export default SingleProductAddToCart;
