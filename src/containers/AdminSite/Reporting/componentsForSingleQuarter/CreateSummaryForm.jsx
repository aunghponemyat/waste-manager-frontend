/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';

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
        <div style={{ display: 'inline' }}>
          <Field
            style={{ marginTop: '10px', width: '500px' }}
            name={`${item}`}
            type="text"
            component="input"
            placeholder={placeholder}
          />
          <p onClick={() => fields.remove(index)} style={{ float: 'right', lineHeight: '32px' }}>
            <span
              className="lnr lnr-trash"
              style={{ color: '#ff4861', cursor: 'pointer' }}
            />
          </p>
        </div>
      </li>
    ))}
  </ul>
);

class CreateSummaryForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col md={12} lg={12}>
        <h4>Please fill the detailed summary by comparing the graphs.</h4>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
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
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Create Summary</Button>
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
})(CreateSummaryForm);
