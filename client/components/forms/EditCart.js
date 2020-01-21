import React, {Component} from 'react';
import axios from 'axios';
import EditCartForm from './EditCartForm';

const defaultState = {
  id: 0,
  quantity: 0
};

export default class EditCart extends Component {
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
        await axios.put('/api/orderProducts', {
          productId: this.props.productId,
          productQty: this.state.quantity
        });
      }
      this.setState(defaultState);
    } catch (err) {
      this.setState({
        errorMessage: `problem updating cart: ${err.message}`
      });
    }
  }

  render() {
    return (
      <EditCartForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
