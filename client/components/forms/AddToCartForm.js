import React from 'react';

const AddToCartForm = props => {
  return (
    <form id="addToCartForm" onSubmit={props.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        onChange={props.handleChange}
        //placeholder="name"
        value={props.name}
      />

      <label htmlFor="quantity">Quantity: </label>
      <input
        type="text"
        name="quantity"
        onChange={props.handleChange}
        placeholder="1"
        value={props.quantity}
      />

      <button type="submit" disabled={!props.name || !props.quantity}>
        Submit
      </button>
    </form>
  );
};

export default AddToCartForm;
