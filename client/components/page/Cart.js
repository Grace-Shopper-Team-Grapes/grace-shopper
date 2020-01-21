import React from 'react';
import {DisplayAllOrderProducts} from '..';
import CartContents from './CartContents';

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
          {/* <DisplayAllOrderProducts /> */}
          <CartContents />
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
