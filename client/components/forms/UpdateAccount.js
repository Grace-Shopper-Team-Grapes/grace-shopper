import React, {Component} from 'react';
import UpdateAccountForm from './UpdateAccountForm';

const defaultState = {
  firstName: '',
  lastName: '',
  email: ''
  //   street1: '',
  //   city: '',
  //   state: '',
  //   zip: ''
};

export default class UpdateAccount extends Component {
  constructor() {
    super();
    this.state = defaultState;
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
      this.props.updateAccount({...this.state});
      this.setState(defaultState);
    } catch (err) {
      this.setState({
        errorMessage: `problem updating Account: ${err.message}`
      });
    }
  }

  render() {
    return (
      <UpdateAccountForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
