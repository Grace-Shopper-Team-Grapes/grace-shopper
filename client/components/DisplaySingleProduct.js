import React from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/singleProduct';
import {Link} from 'react-router-dom';
import AddToCart from './forms/AddToCart';
import EditCart from './forms/EditCart';

//NOTES: addToCart IS NOT PART OF THE REDUX STORE

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct();
  }

  render() {
    if (!this.props.product) {
      return (
        <h1>
          <i className="fas fa-sync-alt fa-spin" />
          loading singleProduct...
        </h1>
      );
    } else {
      const product = this.props.product;
      return (
        <div className="container">
          <div className="page-block pd-container">
            <div className="pd-image-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="pd-image"
              />
            </div>
            <h1 className="pd-title">{product.name}</h1>
            <div className="pd-content-container">
              <div className="pd-add-to-cart__container">
                <form className="pd-add-to-cart__form">
                  <input
                    type="text"
                    className="pd-add-to-cart__quantity text__input text__input--center"
                    defaultValue="1"
                  />
                  <button type="submit" className="pd-add-to-cart__submit">
                    <i className="fas fa-cart-plus" /> Add to Cart
                  </button>
                </form>
              </div>
              <div className="pd-content">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapState = state => {
  return {
    product: state.product
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    getSingleProduct: () => {
      dispatch(getSingleProduct(ownProps.match.params.slug));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
