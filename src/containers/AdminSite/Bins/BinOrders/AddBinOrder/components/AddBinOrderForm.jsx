import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrganizationList } from '../../../../../../redux/actions/apiActions/organizationActions';
import { getBinList } from '../../../../../../redux/actions/apiActions/binActions';
import renderSelectField from '../../../../../../shared/components/form/Select';
import renderInputField from '../../../../../../shared/components/form/FieldComponents';
import history from '../../../../../../shared/utils/history';

class AddBinOrderForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getOrganizationList: PropTypes.func.isRequired,
    getBinList: PropTypes.func.isRequired,
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    bins: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentWillMount() {
    this.props.getOrganizationList();
    this.props.getBinList();
  }

  redirectToListingPage = () => {
    history.push('/bin/orders');
    window.location.reload();
  }

  render() {
    const { handleSubmit, organizations, bins } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="organization"
                    component={renderSelectField}
                    placeholder="Choose Organization"
                    options={organizations.list
                      && organizations.list.map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: prop.name, value: prop._id }
                      ))
                    }
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Bin Type</span>
                <div className="form__form-group-field">
                  <Field
                    name="bin"
                    component={renderSelectField}
                    placeholder="Choose Bin"
                    options={bins.list
                      && bins.list.map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: `${prop.name} ${prop.size}`, value: prop._id }
                      ))
                    }
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Quantity</span>
                <div className="form__form-group-field">
                  <Field
                    name="quantity"
                    component={renderInputField}
                    type="text"
                    placeholder="Enter Quantity"
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
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
  getBinList: () => {
    dispatch(getBinList());
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
  bins: state.bins,
});

const validate = (values) => {
  const errors = {};
  if (!values.organization) {
    errors.organization = 'Required';
  }
  if (!values.bin) {
    errors.bin = 'Required';
  }
  if (!values.quantity) {
    errors.quantity = 'Required';
  } else {
    try {
      // eslint-disable-next-line radix
      const quantity = parseInt(values.quantity);
      if (quantity === null || typeof quantity !== 'number' || Number.isNaN(quantity)) {
        errors.quantity = 'Quantity must be integer.';
      } else {
        // eslint-disable-next-line no-param-reassign
        values.quantity = quantity;
      }
    } catch (err) {
      errors.quantity = 'Quantity must be integer.';
    }
  }
  return errors;
};

export default reduxForm({
  form: 'add_bin_order_form',
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(AddBinOrderForm));
