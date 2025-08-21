/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import history from '../../../../../shared/utils/history';
import renderSelectField from '../../../../../shared/components/form/Select';
import renderInputField from '../../../../../shared/components/form/FieldComponents';

const USER_TYPES = ['SUPER ADMIN', 'ADMIN', 'OPERATION MANAGER', 'OPERATION', 'FINANNCE OFFICE', 'USER', 'DRIVER'];

class EditOrganizationForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  redirectToListingPage = () => {
    history.push('/users');
    window.location.reload();
  }

  render() {
    const { handleSubmit, organizations } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <Field
                name="name"
                component={renderInputField}
                label="Name"
                type="text"
                placeholder="Enter User Name"
              />
              <Field
                name="email"
                component={renderInputField}
                label="Email"
                type="text"
                placeholder="Enter Email"
              />
              <Field
                name="phoneNumber"
                component={renderInputField}
                label="Phone Number"
                type="text"
                placeholder="Enter Phone Number"
              />
              <div className="form__form-group">
                <span className="form__form-group-label">User Type</span>
                <div className="form__form-group-field">
                  <Field
                    name="type"
                    component={renderSelectField}
                    placeholder="Choose User Type"
                    options={USER_TYPES.map((prop, key) => (
                      { key, label: prop, value: prop }
                    ))
                    }
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="organizationId"
                    component={renderSelectField}
                    placeholder="Choose Organization"
                    label="Organization"
                    options={organizations.list
                      && organizations.list.map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: prop.name, value: prop._id }
                      ))
                    }
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
                <Button color="secondary" onClick={() => this.redirectToListingPage()}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[a-z|0-9._%+-]+@[a-z|0-9.-]+\.[a-z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required';
  } else if (!/^([0|/+/][0-9.,-/+/\s]{8,})$/i.test(values.phoneNumber)) {
    errors.phoneNumber = 'Invalid number';
  }
  if (values.type) {
    if (values.type.value === 'USER') {
      if (!values.organizationId) {
        errors.organizationId = 'Required';
      }
    }
  }
  return errors;
};

export default reduxForm({
  form: 'edit_user',
  validate,
})(EditOrganizationForm);
