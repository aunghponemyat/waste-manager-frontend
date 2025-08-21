/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { sendPasswordResetLink } from '../../redux/actions/apiActions/AuthActions';

class ResetPassword extends PureComponent {
  handleSubmit = (values) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.sendPasswordResetLink(values);
    console.log(values.email);
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
              <div className="form__form-group">
                <span className="form__form-group-label">
                  Enter your user account&apos;s verified email account and we will send a passwOrd reset link.
                </span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
                  />
                </div>
              </div>
              <Button
                className="btn btn-primary account__btn account__btn--small"
                color="primary"
              >
                Send password reset email
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendPasswordResetLink: (values) => {
    dispatch(sendPasswordResetLink(values));
  },
});

export default reduxForm({
  form: 'email_verification_form',
})(connect(null, mapDispatchToProps)(ResetPassword));
