/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class EditUserForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">User Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Enter User Name"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Email Address</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Phone Number</span>
                <div className="form__form-group-field">
                  <Field
                    name="phoneNumber"
                    component="input"
                    type="text"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="organizationId.name"
                    component="input"
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Save Changes</Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'edit_user_profile',
})(EditUserForm);
