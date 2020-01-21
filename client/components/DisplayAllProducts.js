import React from 'react';
import {connect} from 'react-redux';
import {getAllProducts} from '../store/products';
import {Link} from 'react-router-dom'; // make all names links to single product information

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
          <h1>
            <Link to="/orderProducts">All Order Products</Link>
          </h1>

          {this.props.products.map(product => {
            return (
              <div key={product.id}>
                <img
                  src={product.imageUrl}
                  align="left"
                  alt="Product Image"
                  width="50%"
                  height="50%"
                  onClick={() =>
                    (window.location.href = `./products/${product.slug}`)
                  }
                />
                {/* <ul>
                  <li>
                    <Link to={'/products/' + product.slug}>{product.name}</Link>
                  </li>
                </ul> */}
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
