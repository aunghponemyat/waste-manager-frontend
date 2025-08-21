import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { getOrganizationList } from '../../../../../../redux/actions/apiActions/organizationActions';
import { getDriverList } from '../../../../../../redux/actions/apiActions/userActions';
import '../../../../../../scss/component/date-time-picker.scss';
import renderSelectField from '../../../../../../shared/components/form/Select';

class AddScheduleForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getOrganizationList: PropTypes.func.isRequired,
    getDriverList: PropTypes.func.isRequired,
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    date: new Date(),
  }

  componentWillMount() {
    this.props.getOrganizationList();
    this.props.getDriverList();
  }

  handleChange = date => this.setState({ date })

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };


  render() {
    const { handleSubmit, organizations, users } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>

              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="organizationId"
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
                <span className="form__form-group-label">Vehicle Plate Number</span>
                <div className="form__form-group-field">
                  <Field
                    name="plate_number"
                    component="input"
                    type="text"
                    placeholder="Enter Vehicle Plate Number"
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Driver</span>
                <div className="form__form-group-field">
                  <Field
                    name="driver"
                    component={renderSelectField}
                    placeholder="Choose Driver"
                    options={users.drivers
                      && users.drivers.map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: prop.name, value: prop._id }
                      ))
                    }
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Pick Up Date</span>
                <div className="form__form-group-field">
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
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

const mapDispatchToProps = dispatch => ({
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
  getDriverList: () => {
    dispatch(getDriverList());
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
  users: state.users,
});

export default reduxForm({
  form: 'horizontal_form', // a unique identifier for this form
})(connect(mapStateToProps, mapDispatchToProps)(AddScheduleForm));
