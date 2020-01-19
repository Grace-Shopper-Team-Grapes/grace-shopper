import React, {Component} from 'react';
import axios from 'axios';
import AddToCartForm from './AddToCartForm';

const defaultState = {
  name: '',
  quantity: ''
};

export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      name: this.props.name
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      this.props.addToCart(this.props.productId, this.state.quantity);
      this.setState({
        ...defaultState,
        name: this.props.name
      });
    } catch (err) {
      this.setState({
        errorMessage: `problem adding to cart: ${err.message}`
      });
    }
  }

  render() {
    return (
      <AddToCartForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
