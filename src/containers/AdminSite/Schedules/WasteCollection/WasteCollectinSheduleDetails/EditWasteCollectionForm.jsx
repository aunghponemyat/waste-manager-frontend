/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm, FieldArray } from 'redux-form';
import renderSelectField from '../../../../../shared/components/form/Select';
import renderMultiSelectField from '../../../../../shared/components/form/MultiInput';
import renderInputField from '../../../../../shared/components/form/FieldComponents';

const unit = ['kg'];
const renderItems = ({ productTypes, fields, meta: { error, submitFailed } }) => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Items
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        <div style={{ display: 'inline-block', width: '100%' }}>
          <h4 style={{ float: 'left' }}>Item #{index + 1}</h4>
          <p onClick={() => fields.remove(index)} style={{ float: 'right', margin: '0 auto' }}>
            <span
              className="lnr lnr-trash"
              style={{ color: '#ff4861', cursor: 'pointer' }}
            />
          </p>
        </div>
        <Field
          name={`${item}.productName`}
          type="text"
          component={renderInputField}
          label="Product Name"
          placeholder="Product Name"
        />
        <div className="form__form-group">
          <span className="form__form-group-label">Product Type</span>
          <div className="form__form-group-field">
            <Field
              name={`${item}.productType`}
              placeholder="Choose Product Type"
              component={renderSelectField}
              options={productTypes
                && productTypes.map((prop, key) => (
                  { key, label: prop, value: prop }
                ))
              }
            />
          </div>
        </div>
        <Field
          name={`${item}.quantity`}
          type="text"
          component={renderInputField}
          label="Quantity"
          placeholder="Quantity"
        />
        <div className="form__form-group">
          <span className="form__form-group-label">Unit</span>
          <div className="form__form-group-field">
            <Field
              name={`${item}.unit`}
              placeholder="Choose Unit"
              component={renderSelectField}
              options={unit
                && unit.map((prop, key) => (
                  { key, label: prop, value: prop }
                ))
              }
            />
          </div>
        </div>
        <Field
          name={`${item}.remark`}
          type="text"
          component={renderInputField}
          label="Remark"
          placeholder="Remark"
        />
        <hr />
      </li>
    ))}
  </ul>
);


class EditWasteCollectionForm extends PureComponent {
  state= {
    status: ['REQUESTED', 'CONFIRMED', 'CANCELLED', 'ONHOLD', 'COMPLETED'],
    productTypes: ['Papers', 'Plastics', 'Cans', 'Glasses', 'E-waste', 'Organic'],
    WayType: ['Dry', 'Organic', 'Dry + Organic'],
    aWeekAgo: new Date().setDate(new Date().getDate() - 7),
  }

  render() {
    const {
      handleSubmit, drivers, operationTeam,
      // initialValues,
    } = this.props;
    const { aWeekAgo } = this.state;

    console.log(aWeekAgo);

    return (
      <form className="form form--horizontal" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Organization</span>
          <div className="form__form-group-field">
            <Field
              name="organizationId.name"
              component="input"
              type="text"
              placeholder="Organization Name"
              disabled
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Pick Up Time</span>
          <div className="form__form-group-field">
            <Field
              name="pickUpTime"
              component="input"
              type="text"
              placeholder="Pick Up Time"
              disabled
            />
          </div>
        </div>
        {/* <div className="form__form-group">
          <span className="form__form-group-label">Vehicle Plate Number</span>
          <div className="form__form-group-field">
            <Field
              name="vehicle.plate_number"
              component="input"
              type="text"
              placeholder="Vehicle Plate Number"
            />
          </div>
        </div> */}
        <Field
          name="wayNumber"
          component={renderInputField}
          label="Way Number"
          type="text"
          placeholder="Way Number"
        />
        <div className="form__form-group">
          <span className="form__form-group-label">Way Type</span>
          <div className="form__form-group-field">
            <Field
              name="wayType"
              placeholder="Way Type"
              component={renderSelectField}
              options={this.state.WayType
                && this.state.WayType.map((prop, key) => (
                  { key, label: prop, value: prop }
                ))
              }
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Driver</span>
          <div className="form__form-group-field">
            <Field
              name="vehicle.driver"
              placeholder="Choose Driver"
              component={renderSelectField}
              options={drivers
                && drivers.map((prop, key) => (
                  { key, label: prop.name, value: prop._id }
                ))
              }
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Status</span>
          <div className="form__form-group-field">
            <Field
              name="status"
              placeholder="Change Status"
              component={renderSelectField}
              options={this.state.status
                && this.state.status.map((prop, key) => (
                  { key, label: prop, value: prop }
                ))
              }
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Operation Team</span>
          <div className="form__form-group-field">
            <Field
              name="operationTeam"
              placeholder="Choose Operation Team"
              component={renderMultiSelectField}
              options={operationTeam
                && operationTeam.map((prop, key) => (
                  { key, label: prop.name, value: prop._id }
                ))
              }
            />
          </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Items</span>
          <div className="form__form-group-field">
            <FieldArray name="items" component={renderItems} productTypes={this.state.productTypes} />
          </div>
        </div>
        <Field
          name="remark"
          component={renderInputField}
          label="Remark"
          type="text"
          placeholder="Remark"
        />
        {this.props.initialValues.updatedBy &&
          <div className="form__form-group">
            <span className="form__form-group-label">Updated By</span>
            <div className="form__form-group-field">
              <Field
                name="updatedBy.name"
                component="input"
                type="text"
                placeholder="Updated By"
                disabled
              />
            </div>
          </div>
        }
        {/* {initialValues && initialValues.pickUpTime && new Date(initialValues.pickUpTime) >= aWeekAgo ?
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" type="submit">Update Details</Button>
          </ButtonToolbar>
          :
          <p style={{
 background: '#ddd', padding: 15, borderRadius: 5, cursor: 'not-allowed',
}}
          >Update Disbaled
          </p>
        } */}
        <ButtonToolbar className="form__button-toolbar">
          <Button color="primary" type="submit">Update Details</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (values.wayNumber) {
    if (!/^([0-9]{1,})$/i.test(values.wayNumber)) {
      errors.wayNumber = 'Invalid Number';
    } else {
      errors.wayNumber = null;
    }
  }
  if (!values.items || !values.items.length) {
    errors.item = null;
  } else {
    const itemsArrayError = [];
    values.items.forEach((item, itemIndex) => {
      const itemsError = {};
      if (!item || !item.productName) {
        itemsError.productName = 'Required';
        itemsArrayError[itemIndex] = itemsError;
      }
      if (!item || !item.quantity) {
        itemsError.quantity = 'Required';
        itemsArrayError[itemIndex] = itemsError;
      } else if (!(values.quantity)) {
        try {
          parseInt(values.quantity, 8);
        } catch (error) {
          itemsError.quantity = 'Invalid Number';
          itemsArrayError[itemIndex] = itemsError;
        }
      }
      if (!item.unit) {
        itemsError.unit = 'Required';
        itemsArrayError[itemIndex] = itemsError;
      }
      if (!item.productType) {
        itemsError.productType = 'Required';
        itemsArrayError[itemIndex] = itemsError;
      }
    });
    if (itemsArrayError.length) {
      errors.items = itemsArrayError;
    }
  }
  return errors;
};

export default reduxForm({
  form: 'edit_waste_collection_form',
  validate,
})(EditWasteCollectionForm);
