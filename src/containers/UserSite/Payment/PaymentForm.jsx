/* eslint-disable camelcase */
import React from 'react';
import { Button } from 'reactstrap';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderInputField from '../../../shared/components/form/FieldComponents';

// eslint-disable-next-line react/prefer-stateless-function
class PaymentForm extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { handleSubmit } = this.props;
    return (
      <form className="form form--horizontal" onSubmit={handleSubmit}>
        <Field
          name="merchant_id"
          type="text"
          label="Merchant_id"
          component={renderInputField}
          placeholder="Enter Merchant Id"
        />
        <Field
          name="user_defined_1"
          type="text"
          label="Invoice No"
          component={renderInputField}
          placeholder="Enter Invoice No"
        />
        <Field
          name="payment_description"
          type="text"
          label="Payment Description"
          component={renderInputField}
          placeholder="Enter Payment Description"
        />
        <Field
          name="amount"
          type="text"
          label="Amount"
          component={renderInputField}
          placeholder="Enter Amount"
        />
        <Field
          name="currency"
          type="text"
          label="Currency"
          component={renderInputField}
          placeholder="Enter Currency"
        />
        <Field
          name="version"
          type="text"
          label="Version"
          component={renderInputField}
          placeholder="Enter Version"
        />
        <Field
          name="payment_url"
          type="text"
          label="Payment Url"
          component={renderInputField}
          placeholder="Enter Payment Url"
        />
        <Field
          name="result_url_1"
          type="text"
          label="Result Url 1"
          component={renderInputField}
          placeholder="Enter Result Url 1"
        />
        <Field
          name="params"
          type="text"
          label="Params"
          component={renderInputField}
          placeholder="Enter Params"
        />
        <Field
          name="hash_value"
          type="text"
          label="Hash Value"
          component={renderInputField}
          placeholder="Enter Hash Value"
        />
        <Button
          style={{ backgroundColor: 'green', color: 'white', width: '100%' }}
          // onClick={() => this.redirectToThankYouPage()}
        >
          Purchase
        </Button>
      </form>

    );
  }
}

export default reduxForm({
  form: 'add_new_invoice_form',
  enableReinitialize: false,
})(PaymentForm);
