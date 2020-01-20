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
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      if (Number(this.state.quantity) > Number(this.props.inventory)) {
        window.alert(`not enough inventory`);
      } else {
        await axios.post('/api/orders/addToCart', {
          pid: this.props.pid,
          pqty: this.state.quantity
        });
      }
      this.setState(defaultState);
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
        name={this.props.name}
      />
    );
  }
}
