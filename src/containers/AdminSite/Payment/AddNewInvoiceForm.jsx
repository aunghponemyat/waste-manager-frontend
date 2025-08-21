/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import renderInputField from '../../../shared/components/form/FieldComponents';
import renderSelectField from '../../../shared/components/form/Select';
import renderDatePickerField from '../../../shared/components/form/DatePicker';
import renderIntervalDatePickerField from '../../../shared/components/form/IntervalDatePicker';
import renderFileInputField from '../../../shared/components/form/FileInput';
import { addNewPayment } from '../../../redux/actions/apiActions/paymentAction';
import history from '../../../shared/utils/history';

const CURRENCY = ['USD', 'MMK'];
const STATUS = ['PENDING', 'APPROVED', 'SETTLED', 'REJECTED'];


class AddNewInvoiceForm extends PureComponent {
  redirectToListingPage = () => {
    // history.push('/organizations');
    // window.location.reload();
  }

  handleSubmit = (values) => {
    if (!values.organization) {
      values.organization = this.props.match.params.organizationId;
    }
    if (values.amount) {
      values.amount = Number(values.amount);
    }
    if (values.currency) {
      values.currency = values.currency.value;
    }
    if (values.paymentStatus) {
      values.paymentStatus = values.paymentStatus.value;
    }
    console.log(values);
    addNewPayment(values).then((response) => {
      if (response.status === 201) {
        window.alert(response.data.message);
        history.push(`/payment/organizations/${this.props.match.params.organizationId}`);
        window.location.reload();
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col md={12} lg={12}>
        <h3>Add New Invoice</h3>
        <Card>
          <CardBody>
            <form
              className="form form--horizontal"
              onSubmit={handleSubmit(this.handleSubmit)}
            >
              <Field
                name="invoiceNo"
                component="input"
                type="text"
                label="Invoice No"
                component={renderInputField}
                placeholder="Enter Invoice No"
              />
              <Field
                name="description"
                component="input"
                type="text"
                component={renderInputField}
                label="Description"
                placeholder="Enter Description"
              />
              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="organization"
                    component="input"
                    type="text"
                    value="KBZ"
                    placeholder="KBzZ"
                    disabled
                  />
                </div>
              </div>
              <Field
                name="amount"
                component="input"
                type="text"
                component={renderInputField}
                label="Amount"
                placeholder="Enter Amount"
              />
              <div className="form__form-group">
                <span className="form__form-group-label">Currency</span>
                <div className="form__form-group-field">
                  <Field
                    name="currency"
                    placeholder="Currency"
                    component={renderSelectField}
                    options={CURRENCY
                      && CURRENCY.map((prop, key) => (
                        { key, label: prop, value: prop }
                      ))
                    }
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Payment Status</span>
                <div className="form__form-group-field">
                  <Field
                    name="paymentStatus"
                    placeholder="Payment Status"
                    component={renderSelectField}
                    options={STATUS
                      && STATUS.map((prop, key) => (
                        { key, label: prop, value: prop }
                      ))
                    }
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Payment Due Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="paymentDueDate"
                    component={renderDatePickerField}
                  />
                  <div className="form__form-group-icon">
                    <CalendarBlankIcon />
                  </div>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Service Period</span>
                <div className="form__form-group-field">
                  <Field
                    name="servicePeriod"
                    component={renderIntervalDatePickerField}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Invoice</span>
                <div className="form__form-group-field">
                  <Field
                    name="invoiceUrl"
                    component={renderFileInputField}
                    type="text"
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

const mapDispatchToProps = dispatch => ({
  addNewPayment: (data) => {
    dispatch(addNewPayment(data));
  },
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'add_new_invoice_form',
  enableReinitialize: true,
})(AddNewInvoiceForm));
