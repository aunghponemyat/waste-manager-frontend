/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, ButtonToolbar } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { FaTrash } from 'react-icons/fa';

import history from '../../../../../shared/utils/history';
import '../../../../../scss/component/pickup-time-picker.scss';
// import renderSelectField from '../../../../../shared/components/form/Select';

class EditScheduleModal extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date),
    handleTimeChange: PropTypes.func.isRequired,
    training: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    submitTimeChange: PropTypes.func.isRequired,
    handleDeleteSchedule: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    isOpen: false,
    date: new Date(),
    training: {},
  };

  goToDetail = (trainingId) => {
    history.push(`/schedules/trainings/${trainingId}`);
    window.location.reload();
  }

  render() {
    const {
      title, isOpen, closeModal, date,
      handleTimeChange, submitTimeChange, training, handleDeleteSchedule,
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={isOpen}
          className="modal-dialog--success"
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={closeModal} />
            <h4 className="bold-text  modal__title">{title}</h4>
          </div>
          <div className="modal__body">
            <form className="form form--horizontal">
              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  {training && <p>{training.organizationId.name}</p>}
                  {/* <Button className="icon icon--right" color="primary" outline><p><FaTrash /></p></Button> */}
                  <button style={{ marginLeft: '10px' }} onClick={() => handleDeleteSchedule(training._id)}>
                    <FaTrash color="red" />
                  </button>
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Training Date</span>
                <div className="form__form-group-field">
                  <DatePicker
                    selected={date}
                    onChange={handleTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div>
            </form>
          </div>
          <ButtonToolbar className="modal__footer">
            <Button
              outline
              onClick={() => this.goToDetail(training._id)}
            >
              Go To Detail
            </Button>
            <Button color="success" onClick={() => submitTimeChange(training._id, date)}>Submit</Button>
          </ButtonToolbar>
        </Modal>
      </div>
    );
  }
}

export default EditScheduleModal;
