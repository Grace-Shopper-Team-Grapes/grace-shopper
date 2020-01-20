import React from 'react';
import {connect} from 'react-redux';
import {getAllOrderProducts} from '../store/orderProducts';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AddToCart from './forms/AddToCart';
import {getAllProducts} from '../store/products';

class AllOrderProducts extends React.Component {
  componentDidMount() {
    this.props.getAllOrderProducts();
    this.props.getAllProducts();
  }

  render() {
    if (!this.props.orderProducts && !this.props.products) {
      return <h1>loading orderProducts</h1>;
    } else {
      const orderProducts = this.props.orderProducts;
      const products = this.props.products;
      //NEED TO ONLY GET PRODUCT INFO FOR ORDERPRODUCTS OF THE ORDER
      //ADD TO CART FORM NEEDS TO BE INCORPORATED
      return orderProducts.map(orderProduct => {
        return (
          <div key={orderProduct.productId}>
            <p>
              price: {orderProduct.price}
              quantity: {orderProduct.quantity}
            </p>
          </div>
        );
      });
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
    },
    getAllProducts: () => {
      dispatch(getAllProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderProducts);

//IGNORE BELOW
/*

return (
        <div>
          {this.props.orderProducts.map(orderProduct => {
            this.props.products.forEach(product => {
              if (product.id === orderProduct.productId) {
                return (
                  <div> 
                    <h1>test</h1>
                  </div>
                )
              }
            });
          })}
        </div>
      );


return (
        <div>
          {this.props.orderProducts.map((orderProduct, index) => {
            this.props.products.forEach((product) => {
              if(product.id === orderProduct.productId){
                
              }
            })
          })
            return (
              <div key={index}>
                <ul>
                  <li>
                    price: {orderProduct.price / 100}, quantity:
                    {orderProduct.quantity}
                    <div>
                      <AddToCart
                        // pid={orderProduct.productId}
                        // inventory={specificProduct.inventory}
                        // name={specificProduct.name}
                        pid={1}
                        inventory={17}
                        name='Cabernet Sauvignon'
                      />
                    </div>
                  </li>
                </ul>
              </div>
            );
          })
*/
