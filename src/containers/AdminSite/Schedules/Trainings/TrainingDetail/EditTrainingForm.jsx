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
import history from '../../../../../shared/utils/history';

const redirectToListingPage = () => {
  history.push('/schedule/trainings');
  window.location.reload();
};

const renderAttendees = ({ fields, meta: { error, submitFailed } }) => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Attendee
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        <div style={{ display: 'inline-block', width: '100%' }}>
          <h4 style={{ float: 'left' }}>Attendee #{index + 1}</h4>
          <p onClick={() => fields.remove(index)} style={{ float: 'right', margin: '0 auto' }}>
            <span
              className="lnr lnr-trash"
              style={{ color: '#ff4861', cursor: 'pointer' }}
            />
          </p>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Attendee Name</span>
          <div className="form__form-group-field">
            <Field
              name={`${item}.name`}
              type="text"
              component="input"
              placeholder="Attendee Name"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Position</span>
          <div className="form__form-group-field">
            <Field
              name={`${item}.position`}
              type="text"
              component="input"
              placeholder="Position"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Department</span>
          <div className="form__form-group-field">
            <Field
              name={`${item}.department`}
              type="text"
              component="input"
              placeholder="Department"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Feedback</span>
          <div className="form__form-group-field">
            <Field
              name={`${item}.feedback`}
              type="text"
              component="input"
              placeholder="Feedback"
            />
          </div>
        </div>
        <hr />
      </li>
    ))}
  </ul>
);

class EditTrainingForm extends PureComponent {
  state= {
    status: ['REQUESTED', 'CONFIRMED', 'ONHOLD', 'COMPLETED'],
    type: ['ONLINE', 'OFFLINE'],
  }

  render() {
    const { handleSubmit } = this.props;

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
          <span className="form__form-group-label">Training Date</span>
          <div className="form__form-group-field">
            <Field
              name="trainingDate"
              component="input"
              type="text"
              placeholder="Pick Up Time"
              disabled
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Trainer Name</span>
          <div className="form__form-group-field">
            <Field
              name="trainerName"
              type="text"
              component="input"
              placeholder="Trainer Name"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Topic</span>
          <div className="form__form-group-field">
            <Field
              name="topic"
              type="text"
              component="input"
              placeholder="Topic"
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
          <span className="form__form-group-label">Type</span>
          <div className="form__form-group-field">
            <Field
              name="type"
              placeholder="Change Training Type"
              component={renderSelectField}
              options={this.state.type
                && this.state.type.map((prop, key) => (
                  { key, label: prop, value: prop }
                ))
              }
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Attendees</span>
          <div className="form__form-group-field">
            <FieldArray name="attendees" component={renderAttendees} />
          </div>
        </div>
        <ButtonToolbar className="form__button-toolbar">
          <Button color="primary" type="submit">Update Details</Button>
          <Button color="secondary" onClick={() => redirectToListingPage()}>
            Cancel
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default reduxForm({
  form: 'edit_training_form',
})(EditTrainingForm);
