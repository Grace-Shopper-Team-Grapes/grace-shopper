import React from 'react';

const Cart = () => (
  <div id="cart-modal-mask">
    <div id="cart-modal-main">
      <h1 className="cart-modal__title">Your Cart</h1>
      <div className="cart-grid">
        <div className="cart-grid__header">
          <div className="grid-item--one-half">&nbsp;</div>
          <div className="grid-item--one-fourth">Quantity</div>
          <div className="grid-item--one-fourth">Total</div>
        </div>
        <div className="cart-grid__body">
          <div className="cart-row">
            <div className="cart-row__info grid-item--one-half">
              <img className="cart-row__product-thumb" />
              <div className="cart-row__product-text">
                Ornellaia 2014 (6L)
                <div className="cart-row__product-remove">
                  <button type="submit" className="btn btn--remove">
                    <i className="fas fa-times" /> Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="cart-row__product-quantity grid-item--one-fourth">
              <input
                type="text"
                className="product-quantity__input"
                name="quantity"
                value="1"
              />
              <button type="submit" name="procuct-quantity__increment">
                +
              </button>
              <button type="submit" name="procuct-quantity__decrement">
                -
              </button>
            </div>
            <div className="cart-row__product-subtotal grid-item--one-fourth">
              $20.00
            </div>
          </div>
        </div>
      </div>
      <br />
      <a
        href="#"
        style={{position: 'absolute', top: '-10px', right: '-10px'}}
        onClick={() => {
          document.getElementById('cart-modal-mask').style.display = 'none';
        }}
      >
        Close Modal{' '}
        <i
          style={{
            fontSize: '1.6em',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '1.6em'
          }}
          className="fas fa-times-circle"
        />
      </a>
    </div>
  </div>
);

export default Cart;
