import React from 'react';

const renderInputField = ({
  // eslint-disable-next-line react/prop-types
  input, label, name, placeholder, type, meta: { touched, error, warning },
}) => (
  <div className="form__form-group">
    <span className="form__form-group-label">{label}</span>
    <div className="form__form-group-field">
      <input {...input} placeholder={placeholder} type={type} name={name} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default renderInputField;
