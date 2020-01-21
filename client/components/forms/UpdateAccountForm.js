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
        placeholder="first name"
        value={props.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        onChange={props.handleChange}
        placeholder="last name"
        value={props.lastName}
      />

      <label htmlFor="email">email:</label>
      <input
        type="text"
        name="email"
        onChange={props.handleChange}
        placeholder="email"
        value={props.email}
      />

      <button
        type="submit"
        disabled={!props.firstName || !props.lastName || ![props.email]}
      >
        Submit
      </button>
    </form>
  );
};

export default UpdateAccountForm;
