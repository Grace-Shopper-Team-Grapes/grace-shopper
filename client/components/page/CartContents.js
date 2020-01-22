import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  getAllOrderProducts,
  updateOrderProduct,
  removeOrderProduct
} from '../../store';
// import axios from 'axios';

class CartContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRemove = this.handleRemove.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleQuantitySubmit = this.handleQuantitySubmit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    this.props.getAllOrderProducts();
    this.setState({orderProducts: this.props.orderProducts});
  }

  componentDidUpdate() {
    let newGrandTotal = 0;
    this.props.orderProducts.forEach(item => {
      newGrandTotal += item.price * item.quantity;
    });
    this.props.updateCartState(newGrandTotal, this.props.orderProducts.length);
  }

  handleRemove(event, productId) {
    this.props.removeOrderProduct(productId);
  }

  handleQuantityChange(event, productId) {
    const newQty = event.target.value;

    this.setState(prevState => {
      // I need to deep-copy the orderProducts array so I don't mutate the previous state.

      return prevState.orderProducts.map(orderProduct => {
        if (orderProduct.id === productId) {
          orderProduct[event.target.name] = newQty;
        }
        return orderProduct;
      });
    });
  }

  handleQuantitySubmit(event, productId) {
    this.props.updateOrderProduct(productId, event.target.value);
  }
  handleIncrement(event, productId) {
    const qtyInputField = document.getElementById(
      `product-quantity-${productId}`
    );
    console.log('quantity field is: ', qtyInputField);
    const newQty = +qtyInputField.value + 1;
    console.log(`newQty is ${newQty} with type`, typeof newQty);
    this.props.updateOrderProduct(productId, newQty);
    qtyInputField.value = newQty;
  }
  handleDecrement(event, productId) {
    const qtyInputField = document.getElementById(
      `product-quantity-${productId}`
    );
    console.log('quantity field is: ', qtyInputField);
    const newQty = +qtyInputField.value - 1;
    console.log(`newQty is ${newQty} with type`, typeof newQty);

    // Remove the product if newQty is 0:
    if (!newQty) {
      // eslint-disable-next-line no-alert
      if (confirm('Remove product from cart?')) {
        this.props.removeOrderProduct(productId);
      }
    } else {
      this.props.updateOrderProduct(productId, newQty);
      qtyInputField.value = newQty;
    }
  }

  render() {
    if (!this.props.orderProducts) {
      return (
        <div className="cart--loading">
          <i className="fas fa-sync-alt fa-spin" /> Loading Cart
        </div>
      );
    } else {
      const orderProducts = this.props.orderProducts;
      return orderProducts.map(item => (
        <div key={item.id} className="cart-row">
          <div className="cart-row__info grid-item--one-half">
            <img className="cart-row__product-thumb" />
            <div className="cart-row__product-text">
              <Link
                to={`/products/${item.slug}`}
                className="cart-row__product-link"
              >
                {item.name}
              </Link>
              <div className="cart-row__product-price">
                ${(item.price / 100).toFixed(2)}
              </div>
              <div className="cart-row__product-remove">
                <button
                  type="submit"
                  className="btn btn--remove"
                  onClick={e => this.handleRemove(e, item.id)}
                >
                  <i className="fas fa-times" /> Remove
                </button>
              </div>
            </div>
          </div>
          <div className="cart-row__product-quantity grid-item--one-fourth">
            <input
              type="text"
              className="product-quantity__input text__input text__input--center"
              name="quantity"
              defaultValue={item.quantity}
              onChange={e => this.handleQuantityChange(e, item.id)}
              onBlur={e => this.handleQuantitySubmit(e, item.id)}
              id={`product-quantity-${item.id}`}
            />
            <button
              type="submit"
              className="product-quantity__increment product-quantity__modifier"
              name="quantityIncrement"
              onClick={e => this.handleIncrement(e, item.id)}
            >
              +
            </button>
            <button
              type="submit"
              className="product-quantity__decrement product-quantity__modifier"
              name="quantityDecrement"
              onClick={e => this.handleDecrement(e, item.id)}
            >
              &ndash;
            </button>
          </div>
          <div className="cart-row__product-subtotal grid-item--one-fourth">
            ${(item.price * item.quantity / 100).toFixed(2)}
          </div>
        </div>
      ));
    }
  }
}

const mapStateToProps = state => {
  return {
    orderProducts: state.orderProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderProducts: () => {
      dispatch(getAllOrderProducts());
    },
    updateOrderProduct: (productId, productQty) => {
      dispatch(updateOrderProduct(productId, productQty));
    },
    removeOrderProduct: productId => {
      dispatch(removeOrderProduct(productId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContents);
