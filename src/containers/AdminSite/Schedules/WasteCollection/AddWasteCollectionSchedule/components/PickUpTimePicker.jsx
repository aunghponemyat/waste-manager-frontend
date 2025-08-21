import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import '../../../../../../scss/component/date-time-picker.scss';
import { CHANGE_PICKUP_TIME } from '../../../../../../redux/actions/apiActions/ActionTypes';

class PickupTimePicker extends PureComponent {
  static propTypes = {
    changePickUpTime: PropTypes.func.isRequired,
  };

  state = {
    pickUpTime: new Date(),
  }

  handleChange = (date) => {
    this.setState({ pickUpTime: date });
    this.props.changePickUpTime(date.toISOString());
  }

  render() {
    return (
      <div className="form__form-group">
        <span className="form__form-group-label">Joined Date</span>
        <div className="form__form-group-field">
          <DatePicker
            selected={this.state.pickUpTime}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            // timeCaption="Time"
            // timeIntervals={15}
            // dateFormat="MMMM d, yyyy h:mm aa"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <Field
          style={{ display: 'none' }}
          name="pickUpTime"
          component="input"
          type="text"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: { pickUpTime: state.logistics.pickUpTime },
});

const mapDispatchToProps = dispatch => ({
  changePickUpTime: date => dispatch({
    type: CHANGE_PICKUP_TIME,
    payload: date,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'addPickUpTime',
  enableReinitialize: true,
})(PickupTimePicker));
