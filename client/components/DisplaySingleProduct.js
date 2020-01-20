import React from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/singleProduct';
import {Link} from 'react-router-dom';

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct();
  }

  render() {
    if (!this.props.product) {
      return <h1><i class="fas fa-sync-alt fa-spin"></i>loading singleProduct...</h1>;
    } else {
      const product = this.props.product;
      return (
        <div>
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
          <h3>{product.inventory}</h3>
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
