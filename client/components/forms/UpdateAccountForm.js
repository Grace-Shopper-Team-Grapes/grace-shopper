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
  return (
    <form id="campus-form" onSubmit={props.handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        name="firstName"
        onChange={props.handleChange}
        placeholder="Edit First Name"
        value={props.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        onChange={props.handleChange}
        placeholder="Edit Last Name"
        value={props.lastName}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        onChange={props.handleChange}
        placeholder="Edit Email"
        value={props.email}
      />

      <label htmlFor="phone">Phone Number:</label>
      <input
        type="text"
        name="phone"
        onChange={props.handleChange}
        placeholder="Edit Phone Number"
        value={props.phone}
      />

      <label htmlFor="street1">Street:</label>
      <input
        type="text"
        name="street1"
        onChange={props.handleChange}
        placeholder="Edit Street"
        value={props.street1}
      />

      <label htmlFor="city">City:</label>
      <input
        type="text"
        name="city"
        onChange={props.handleChange}
        placeholder="Edit City"
        value={props.city}
      />

      <label htmlFor="state">State:</label>
      <input
        type="text"
        name="state"
        onChange={props.handleChange}
        placeholder="Edit State"
        value={props.state}
      />

      <label htmlFor="zip">Zip:</label>
      <input
        type="text"
        name="zip"
        onChange={props.handleChange}
        placeholder="Edit Zip Code"
        value={props.zip}
      />
      <br />
      <button
        type="submit"
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
        Submit
      </button>
    </form>
  );
};

export default UpdateAccountForm;
