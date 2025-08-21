import React from 'react';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';

const renderPasswordField = ({
  // eslint-disable-next-line react/prop-types
  input, label, name, placeholder, type, meta: { touched, error, warning },
}) => (
  <div className="form__form-group">
    <span className="form__form-group-label">{label}</span>
    <div className="form__form-group-field">
      <div className="form__form-group-icon">
        <KeyVariantIcon />
      </div>
      <input {...input} placeholder={placeholder} type={type} name={name} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
export default renderPasswordField;
