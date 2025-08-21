/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
// import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import renderPasswordField from '../../shared/components/form/PasswordComponents';
import { resetPassword } from '../../redux/actions/apiActions/AuthActions';

class ResetPassword extends PureComponent {
  handleSubmit = (values) => {
    console.log(values.password);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetPassword(values, this.props.match.params.link);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">
                Welcome to
                <span className="account__logo-accent"> RecyGlo</span>
              </h3>
              <h4 className="account__subhead subhead">
                Making Myanmar a Cleaner Place
              </h4>
            </div>
            <form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                name="password"
                component={renderPasswordField}
                type="password"
                placeholder="Password"
              />
              <Field
                name="confirmPassword"
                component={renderPasswordField}
                type="password"
                placeholder="Confirm Password"
              />
              <Button
                className="btn btn-primary account__btn account__btn--small"
                color="primary"
              >
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Please enter the same password!';
  }
  console.log(errors);
  return errors;
};

const mapDispatchToProps = dispatch => ({
  resetPassword: (values, id) => {
    dispatch(resetPassword(values, id));
  },
});

export default reduxForm({
  validate,
  form: 'email_verification_form',
})(connect(null, mapDispatchToProps)(ResetPassword));
