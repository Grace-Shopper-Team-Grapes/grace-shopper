import React from 'react';
import {connect} from 'react-redux';
import {getAllProducts} from '../store/products';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    if (!this.props.products) {
      return <h1>loading products</h1>;
    } else {
      return (
        <div>
          {this.props.products.map(product => {
            return (
              <div key={product.id}>
                <ul>
                  <li>{product.name}</li>
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
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(getAllProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
