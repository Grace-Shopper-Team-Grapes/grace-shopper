import React from 'react';
/*
  quantity: ''
*/
const EditCartForm = props => {
  return (
    <input
      type="text"
      name="quantity"
      onChange={props.handleChange}
      onBlur={props.handleSubmit}
      value={props.quantity}
    />
  );
};

export default EditCartForm;
