import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import '../../../../../../scss/component/date-time-picker.scss';

class AddTraningScheduleForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  state = {
    date: new Date(),
  }

  handleChange = date => this.setState({ date })

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };


  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="organizationName"
                    component="input"
                    type="text"
                    placeholder="Enter Organization Name"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Training Period</span>
                <div className="form__form-group-field">
                  <Field
                    name="trainingPeriod"
                    component="input"
                    type="text"
                    placeholder="Enter Training Period"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Start Training Date</span>
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
                <Button type="button" onClick={reset}>
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
  form: 'horizontal_form', // a unique identifier for this form
})(withTranslation('common')(AddTraningScheduleForm));
