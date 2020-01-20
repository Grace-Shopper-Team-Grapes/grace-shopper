import React from 'react';
import {connect} from 'react-redux';
import {getAllOrderProducts} from '../store/orderProducts';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AllOrderProducts extends React.Component {
  componentDidMount() {
    this.props.getAllOrderProducts();
  }

  render() {
    if (!this.props.orderProducts && !this.props.products) {
      return <h1>loading orderProducts</h1>;
    } else {
      const orderProducts = this.props.orderProducts;
      return (
        <div>
          <h1>
            <Link to="/products">All Products</Link>
          </h1>
          {orderProducts.map(orderProduct => {
            return (
              <div key={orderProduct.productId}>
                <ul>
                  <li>
                    quantity: {orderProduct.quantity}, price:
                    {orderProduct.price / 100} for productId:
                    {orderProduct.productId}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    orderProducts: state.orderProducts,
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderProducts: () => {
      dispatch(getAllOrderProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderProducts);
