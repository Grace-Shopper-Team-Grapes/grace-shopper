import React, {Component} from 'react';
import EditCartForm from './EditCartForm';

const defaultState = {
  quantity: ''
};

export default class EditCart extends Component {
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
      this.props.editCart({...this.state});
      this.setState(defaultState);
    } catch (err) {
      this.setState({
        errorMessage: `problem updating Cart: ${err.message}`
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
