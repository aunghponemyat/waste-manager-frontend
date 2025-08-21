/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
import history from '../../../../../../shared/utils/history';
// import '../../../../../scss/component/date-time-picker.scss';
// import StartDatePicker from './EditStartDatePicker';
// import ExpiredDatePicker from './EditExpiredDatePicker';
// import { CHANGE_EXPIRED_DATE, CHANGE_START_DATE } from '../../../../../../redux/actions/apiActions/ActionTypes';
// import renderSelectField from '../../../../../shared/components/form/Select';
import renderDropZoneField from '../../../../../../shared/components/form/DropZone';

class EditBinForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  redirectToListingPage = () => {
    history.push('/bin/available-bins');
    window.location.reload();
  }

  render() {
    const { handleSubmit, initialValues } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Bin Type</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Enter Bin Type"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Bin Size</span>
                <div className="form__form-group-field">
                  <Field
                    name="size"
                    component="input"
                    type="text"
                    placeholder="Enter Bin Size"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Stock</span>
                <div className="form__form-group-field">
                  <Field
                    name="stock"
                    component="input"
                    type="text"
                    placeholder="Enter Bin Stock"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Price</span>
                <div className="form__form-group-field">
                  <Field
                    name="price"
                    component="input"
                    type="text"
                    placeholder="Enter Bin Price"
                  />
                </div>
              </div>
              {initialValues.image &&
                <div className="form__form-group">
                  <span className="form__form-group-label">Image</span>
                  <div className="form__form-group-field" style={{ width: 200, height: 200, paddingLeft: 0 }}>
                    <img src={initialValues.image} alt={initialValues.name} />
                  </div>
                </div>
              }
              <Field
                name="image"
                component={renderDropZoneField}
              />
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

export default reduxForm({
  form: 'edit_bin',
})(EditBinForm);
