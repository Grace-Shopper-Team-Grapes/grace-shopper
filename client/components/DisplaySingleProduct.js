import React from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/singleProduct';
import {Link} from 'react-router-dom';
import AddToCart from './forms/AddToCart';

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct();
  }

  render() {
    if (!this.props.product) {
      return (
        <h1>
          <i className="fas fa-sync-alt fa-spin" />loading singleProduct...
        </h1>
      );
    } else {
      const product = this.props.product;
      return (
        <div>
          <h1>name: {product.name}</h1>
          <h2>price: {product.price / 100}</h2>
          <h3>inventory: {product.inventory}</h3>
          <h5>
            <Link to="/products">Back to All Products</Link>
          </h5>
          <div>
            <AddToCart addToCart={this.props.addToCart} name={product.name} />
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
