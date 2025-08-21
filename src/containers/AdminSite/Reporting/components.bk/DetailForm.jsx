/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import renderDropZoneField from '../../../../shared/components/form/DropZone';

const renderList = ({ placeholder, fields, meta: { error, submitFailed } }) => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <button type="button" onClick={() => fields.push('')}>
        Add {placeholder}
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        <Field
          style={{ marginTop: '10px', width: '500px' }}
          name={`${item}`}
          type="text"
          component="input"
          placeholder={placeholder}
        />
      </li>
    ))}
  </ul>
);

class DetailForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col md={12} lg={12}>
        <h4>Please fill the detail information by comparing the graphs.</h4>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Report Title</span>
                <div className="form__form-group-field">
                  <Field
                    name="reportTitle"
                    component="input"
                    type="text"
                    placeholder="Enter Report Title"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Report Created Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="reportDate"
                    component="input"
                    type="text"
                    placeholder="Enter Report Created Date"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Audit Start Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="auditStartDate"
                    component="input"
                    type="text"
                    placeholder="Enter Audit Start Date"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Contract Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="contractDate"
                    component="input"
                    type="text"
                    placeholder="Enter Contract Date"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Address 1</span>
                <div className="form__form-group-field">
                  <Field
                    name="address1"
                    component="input"
                    type="text"
                    placeholder="Enter Address 1"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Address 2</span>
                <div className="form__form-group-field">
                  <Field
                    name="address2"
                    component="input"
                    type="text"
                    placeholder="Enter Address 2"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Address 3</span>
                <div className="form__form-group-field">
                  <Field
                    name="address3"
                    component="input"
                    type="text"
                    placeholder="Enter Address 3"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Recommendations</span>
                <div className="form__form-group-field">
                  <FieldArray name="recommendations" component={renderList} placeholder="Recommendations" />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Findings</span>
                <div className="form__form-group-field">
                  <FieldArray name="findings" component={renderList} placeholder="Findings" />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Background Image</span>
                <div className="form__form-group-field">
                  <Field
                    name="background"
                    component={renderDropZoneField}
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'add_user_form',
})(DetailForm);
