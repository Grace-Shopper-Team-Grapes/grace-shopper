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
        <div>
          <h5>
            <Link to="/products">Back to All Products</Link>
            <br />
            <Link to="/orderProducts">All Order Products</Link>
          </h5>
          <img
            src={product.imageUrl}
            align="left"
            alt="Product Image"
            width="50%"
            height="50%"
          />
          <h2 margin-left="10px">Price: ${product.price / 100}</h2>
          <h3>Inventory: {product.inventory}</h3>
          <h4>{product.description}</h4>

          <div>
            <AddToCart
              pid={product.id}
              inventory={product.inventory}
              name={product.name}
            />
          </div>

          {/* <h1>{product.name}</h1>
          <img src={product.imageUrl} width="200" height="600"/>
          <h2>Price: {product.price / 100}</h2>
          <h3>Inventory: {product.inventory}</h3>
          <h4>{product.description}</h4>
          <h5>
            <Link to="/products">Back to All Products</Link>
          </h5>
          <h6>
            <Link to="/orderProducts">All Order Products</Link>
          </h6>
          <div>
            <AddToCart
              productId={product.id}
              inventory={product.inventory}
              name={product.name}
            />
          </div>
          <div>
            <EditCart
              productId={product.id}
              inventory={product.inventory}
              name={product.name}
            />
          </div> */}
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
