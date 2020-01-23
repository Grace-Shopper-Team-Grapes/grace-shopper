import React from 'react';
import {connect} from 'react-redux';
import SingleProductAddToCart from '../forms/SingleProductAddToCart';
import {addOrderProduct, getSingleProduct} from '../../store';

//NOTES: addToCart IS NOT PART OF THE REDUX STORE

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      atcError: ''
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.getSingleProduct();
  }

  handleQtyChange(event) {
    if (isNaN(event.target.value))
      this.setState({atcError: 'Quantity must be a number'});
    else {
      this.setState({
        [event.target.name]: event.target.value
      });
      this.setState({atcError: ''});
    }
  }

  handleAddToCart(event, productId) {
    event.preventDefault();

    if (isNaN(this.state.quantity))
      this.setState({atcError: 'Quantity must be a number'});
    else {
      this.props.addOrderProduct(productId, this.state.quantity);
      this.setState({atcError: ''});
    }
  }

  render() {
    if (!this.props.product) {
      return (
        <div className="container page-block pd-container">
          <h1>
            <i className="fas fa-sync-alt fa-spin" />
            loading singleProduct...
          </h1>
        </div>
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
              <SingleProductAddToCart
                product={product}
                handleQtyChange={this.handleQtyChange}
                handleAddToCart={this.handleAddToCart}
                atcError={this.state.atcError}
              />
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
    },
    addOrderProduct: (productId, productQty) => {
      dispatch(addOrderProduct(productId, productQty));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
