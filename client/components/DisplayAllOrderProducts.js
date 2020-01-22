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
    if (!this.props.orderProducts) {
      return <h1>loading orderProducts</h1>;
    } else {
      const orderProducts = this.props.orderProducts;
      return (
        <div>
          <h1>
            <Link to="/products">All Products</Link>
          </h1>
          {orderProducts.map((orderProduct, idx) => {
            const thisKey = orderProduct + idx;
            return (
              <div key={thisKey}>
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
    orderProducts: state.orderProducts
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