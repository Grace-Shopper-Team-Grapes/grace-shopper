import React from 'react';
import {connect} from 'react-redux';
import {getAllProducts} from '../../store/products';
import ProductGridItem from './module/ProductGridItem';
import {addOrderProduct} from '../../store';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleAddToCart(event, productId) {
    event.preventDefault();
    this.props.addOrderProduct(productId, 1);
  }

  render() {
    const products = this.props.products;

    if (!products) {
      return (
        <div className="loading">
          <i className="fas fa-spinner fa-sync-alt" />
          Loading Products &ellips;
        </div>
      );
    }

    return (
      <div className="container">
        <div className="page-block">
          <h2 className="page-block__title page-block__title--center">
            All Products
          </h2>
          <div className="products-grid-container products-grid--all">
            <div className="products-grid-controls">
              {/* <!-- we probably won't bother with this --> */}
            </div>
            <div className="products-grid--fourths">
              {products.map(product => (
                <ProductGridItem
                  key={product.id}
                  product={product}
                  handleAddToCart={this.handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({products: state.products});

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(getAllProducts());
    },
    addOrderProduct: (productId, productQty) => {
      dispatch(addOrderProduct(productId, productQty));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
