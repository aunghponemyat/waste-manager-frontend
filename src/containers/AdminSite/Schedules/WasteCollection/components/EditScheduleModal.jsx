/* eslint-disable no-underscore-dangle, react/prop-types */
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
    logistics: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    submitTimeChange: PropTypes.func.isRequired,
    handleDeleteSchedule: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    isOpen: false,
    date: new Date(),
    logistics: {},
  };

  goToDetail = (logisticsId) => {
    history.push(`/schedule/waste-collection/${logisticsId}`);
    window.location.reload();
  }

  render() {
    const {
      title, isOpen, closeModal, date,
      handleTimeChange, submitTimeChange, logistics, handleDeleteSchedule,
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
                  {logistics && <p>{logistics.organizationId.name}</p>}
                  {/* <Button className="icon icon--right" color="primary" outline><p><FaTrash /></p></Button> */}
                  <Button
                    className="btn btn-danger"
                    style={{
                      margin: '0 auto',
                      marginLeft: '10px',
                      padding: '0px 0px 2px 2px',
                      minWidth: '20px',
                      maxHeight: '35px',
                    }}
                    onClick={() => handleDeleteSchedule(logistics._id)}
                  >
                    <FaTrash color="red" />
                  </Button>
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Pick Up Date</span>
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
              onClick={() => this.goToDetail(logistics._id)}
            >
              Go To Detail
            </Button>
            <Button color="success" onClick={() => submitTimeChange(logistics._id, date)}>Submit</Button>
          </ButtonToolbar>
        </Modal>
      </div>
    );
  }
}

export default EditScheduleModal;
