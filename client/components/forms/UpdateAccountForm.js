import React from 'react';
/*
firstName: '',
  lastName: '',
  email: '',
  street1: '',
  city: '',
  state: '',
  zip: ''
*/
const UpdateAccountForm = props => {
  console.log(props);
  let account = props.account;
  console.log('this is props', props);
  return (
    <div className="form-container form-container--center">
      <form
        className="login-form"
        id="campus-form"
        onSubmit={props.handleSubmit}
      >
        <label htmlFor="firstName">
          <small>First Name:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="firstName"
          onChange={props.handleChange}
          placeholder={account.firstName}
          value={props.firstName}
        />

        <label htmlFor="lastName">
          <small>Last Name:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="lastName"
          onChange={props.handleChange}
          placeholder={account.lastName}
          value={props.lastName}
        />

        <label htmlFor="email">
          <small>Email:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="email"
          onChange={props.handleChange}
          placeholder={account.email}
          value={props.email}
        />

        <label htmlFor="phone">
          <small>Phone Number:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="phone"
          onChange={props.handleChange}
          placeholder={account.phone}
          value={props.phone}
        />

        <label htmlFor="street1">
          <small>Street:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="street1"
          onChange={props.handleChange}
          placeholder={account.street1}
          value={props.street1}
        />

        <label htmlFor="city">
          <small>City:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="city"
          onChange={props.handleChange}
          placeholder={account.city}
          value={props.city}
        />

        <label htmlFor="state">
          <small>State:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="state"
          onChange={props.handleChange}
          placeholder={account.state}
          value={props.state}
        />

        <label htmlFor="zip">
          <small>Zip:</small>
        </label>
        <input
          className="text__input"
          type="text"
          name="zip"
          onChange={props.handleChange}
          placeholder={account.zip}
          value={props.zip}
        />
        <br />
        <button
          type="submit"
          className="btn"
          disabled={
            !props.firstName ||
            !props.lastName ||
            ![props.email] ||
            !props.phone ||
            !props.street1 ||
            !props.city ||
            !props.state ||
            !props.zip
          }
        >
          Update Account
        </button>
      </form>
    </div>
  );
};

export default UpdateAccountForm;
