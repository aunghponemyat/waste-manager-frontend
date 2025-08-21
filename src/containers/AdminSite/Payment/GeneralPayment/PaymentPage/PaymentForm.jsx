/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import renderInputField from '../../../../../shared/components/form/FieldComponents';
import renderCheckBoxField from '../../../../../shared/components/form/CheckBox';
// import renderSelectField from '../../../../../shared/components/form/Select';

// eslint-disable-next-line import/no-mutable-exports
let PaymentForm = (props) => {
  const {
    handleSubmit,
    quantity,
    certificate,
  } = props;
  return (
    <Container>
      <form className="form form--horizontal" onSubmit={handleSubmit}>
        <Field
          name="customerName"
          type="text"
          component={renderInputField}
          label="Full Name"
          placeholder="Enter Full Name"
        />
        <Field
          name="customerEmail"
          type="email"
          component={renderInputField}
          label="Email Address"
          placeholder="Enter Email Address"
        />
        <Field
          name="customerPhno"
          type="text"
          component={renderInputField}
          label="Contact Number"
          placeholder="Enter Contact Number"
        />
        <Field
          name="deliveryAddress"
          type="text"
          component={renderInputField}
          label="Delivery Address"
          placeholder="Enter Delivery Address"
        />
        <Field
          name="quantity"
          type="number"
          component={renderInputField}
          label="Quantity"
          placeholder="Enter Quantity"
        />
        {quantity &&
          <div>
            {/* <div className="form__form-group">
              <span className="form__form-group-label">Tax</span>
              <div className="form__form-group-field">
                <p>${parseInt(quantity, 0) * 100 * 0.05}</p>
              </div>
            </div> */}
            <div className="form__form-group">
              <span className="form__form-group-label">Total Amount</span>
              <div className="form__form-group-field">
                {certificate ?
                  <p>${(parseInt(quantity, 0) * 150)} USD (VAT Inclusive)</p>
                  :
                  <p>${(parseInt(quantity, 0) * 100)} USD (VAT Inclusive)</p>
                }
              </div>
            </div>
          </div>
        }
        <div className="form__form-group">
          <Field
            name="certificate"
            component={renderCheckBoxField}
            label="Certificate of Recycling ($50 for each box)"
            className="colored-click"
          />
        </div>
        <div className="form__form-group">
          <Field
            name="tnc"
            component={renderCheckBoxField}
            label="I have read and agree to the "
            className="colored-click"
          />
          <a href="https://www.recyglo.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            &nbsp;<u>Terms and Conditions.</u></a>
        </div>
        <Button color="success" type="submit">Continue</Button>
      </form>
    </Container>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.customerName) {
    errors.customerName = 'Required';
  }
  if (!values.customerEmail) {
    errors.customerEmail = 'Required';
  }
  if (!values.customerPhno) {
    errors.customerPhno = 'Required';
    /* eslint-disable-next-line no-restricted-globals */
  } else if (values.customerPhno && isNaN(Number(values.customerPhno))) {
    errors.customerPhno = 'Please enter valid phone number.';
  }
  if (!values.quantity) {
    errors.quantity = 'Required';
  }
  if (!values.deliveryAddress) {
    errors.deliveryAddress = 'Required';
  }
  if (!values.tnc) {
    errors.tnc = 'Required';
  }
  console.log(errors);
  return errors;
};

PaymentForm = reduxForm({
  form: 'payment_information_form',
  // change: reduxForm.change,
  // dispatch: reduxForm.dispatch,
  validate,
})(PaymentForm);

const selector = formValueSelector('payment_information_form'); // <-- same as form name
PaymentForm = connect((state) => {
  const quantity = selector(state, 'quantity');
  const certificate = selector(state, 'certificate');
  return {
    quantity,
    certificate,
  };
})(PaymentForm);

export default PaymentForm;
