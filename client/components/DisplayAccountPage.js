import React from 'react';
import {connect} from 'react-redux';
import {getAccount, updateAccount} from '../store/account';
import {Link} from 'react-router-dom';
import UpdateAccount from './forms/UpdateAccount';

class AccountPage extends React.Component {
  componentDidMount() {
    this.props.getAccount();
  }

  render() {
    if (!this.props.account) {
      return (
        <div>
          <h1>loading...</h1>
        </div>
      );
    } else {
      const account = this.props.account;
      return (
        <div>
          <h1>
            Name: {account.firstName}, {account.lastName}{' '}
          </h1>
          <h2>Email: {account.email}</h2>
          <h3>phone: {account.phone}</h3>
          <h4>etc...</h4>
          <UpdateAccount updateAccount={this.props.updateAccount} />
        </div>
      );
    }
  }
}

const mapState = state => {
  return {
    account: state.account
  };
};

const mapDispatch = dispatch => {
  return {
    getAccount: () => {
      dispatch(getAccount());
    },
    updateAccount: updateObj => {
      dispatch(updateAccount(updateObj));
    }
  };
};

export default connect(mapState, mapDispatch)(AccountPage);
