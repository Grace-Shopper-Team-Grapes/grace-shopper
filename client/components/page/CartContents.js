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
    this.state = [{}];
    this.handleRemove = this.handleRemove.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleQuantitySubmit = this.handleQuantitySubmit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    this.props.getAllOrderProducts();
  }

  handleRemove(productId) {
    this.props.removeOrderProduct(productId);
  }

  // this handler is incomplete
  // should we just skip it and not save qty on React state?
  handleQuantityChange(event, productId) {
    // If I have a state that has an array of Product objects,
    // how do I set state for a particular one of those objects?
    // Ideas:
    // Loop through state, capture the index of the product
    // with id===productID, and then filter state to array spread, and add updated Qty to that one? Seems incomplete.
    // this.setState({
    //   [event.target.name]: event.target.value;
    // })
    const newQty = event.target.value;

    this.setState(prevState => {
      // I need to deep-copy the orderProducts array so I don't mutate the previous state.
      console.log(prevState);
      prevState.orderProducts.forEach(item => {
        if (item.productId === productId) {
          item[event.target.name] = newQty;
        }
      });
      return [...prevState];
    });
  }

  handleQuantitySubmit(event, productId) {
    this.props.updateOrderProduct(productId, event.target.value);
  }
  handleIncrement(event, productId) {
    const inputValue = event.target.parentNode.firstChild.value;
    this.props.updateOrderProduct(productId, inputValue + 1);
  }
  handleDecrement(event, productId) {
    const inputValue = event.target.parentNode.firstChild.value;
    this.props.updateOrderProduct(productId, inputValue - 1);
  }

  render() {
    if (!this.props.orderProducts) {
      return (
        <div className="cart--loading">
          <i className="fas fa-sync-alt fa-spin" /> Loading Cart
        </div>
      );
    } else {
      console.log(this.props);
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
              <div className="cart-row__product-price">${item.price / 100}</div>
              <div className="cart-row__product-remove">
                <button
                  type="submit"
                  className="btn btn--remove"
                  onClick={() => this.handleRemove(item.id)}
                >
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
              defaultValue={item.quantity}
              onChange={e => this.handleQuantityChange(e, item.id)}
              onBlur={e => this.handleQuantitySubmit(e, item.id)}
            />
            <button
              type="submit"
              name="procuct-quantity__increment"
              onClick={e => this.handleIncrement(e, item.id)}
            >
              +
            </button>
            <button
              type="submit"
              name="procuct-quantity__decrement"
              onClick={e => this.handleDecrement(e, item.id)}
            >
              -
            </button>
          </div>
          <div className="cart-row__product-subtotal grid-item--one-fourth">
            ${item.price * item.quantity / 100}
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
