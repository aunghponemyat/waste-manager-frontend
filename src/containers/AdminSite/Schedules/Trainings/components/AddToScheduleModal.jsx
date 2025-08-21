import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, ButtonToolbar } from 'reactstrap';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import '../../../../../scss/component/pickup-time-picker.scss';
import { getOrganizationList } from '../../../../../redux/actions/apiActions/organizationActions';
import renderSelectField from '../../../../../shared/components/form/Select';

class EditScheduleModal extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    color: PropTypes.string.isRequired,
    colored: PropTypes.bool,
    header: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getOrganizationList: PropTypes.func.isRequired,
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    date: PropTypes.instanceOf(Date),
    handleTimeChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    colored: false,
    header: false,
    isOpen: false,
    date: new Date(),
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOpen: false,
  //   };

  //   this.toggle = this.toggle.bind(this);
  // }

  // toggle() {
  //   this.setState(prevState => ({
  //     isOpen: !prevState.modal,
  //   }));
  // }

  componentWillMount() {
    this.props.getOrganizationList();
  }

  render() {
    const {
      color, title, organizations, colored, header, isOpen, closeModal, handleSubmit, date,
      handleTimeChange,
    } = this.props;
    // let Icon;

    // switch (color) {
    //   case 'primary':
    //     Icon = <span className="lnr lnr-pushpin modal__title-icon" />;
    //     break;
    //   case 'success':
    //     Icon = <span className="lnr lnr-thumbs-up modal__title-icon" />;
    //     break;
    //   case 'warning':
    //     Icon = <span className="lnr lnr-flag modal__title-icon" />;
    //     break;
    //   case 'danger':
    //     Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
    //     break;
    //   default:
    //     break;
    // }
    const modalClass = classNames({
      'modal-dialog--colored': colored,
      'modal-dialog--header': header,
    });

    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        {/* <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal> */}
        <Modal
          isOpen={isOpen}
          className={`modal-dialog--${color} ${modalClass}`}
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={closeModal} />
            {/* {header ? '' : Icon} */}
            <h4 className="bold-text  modal__title">{title}</h4>
          </div>
          <div className="modal__body">
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
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
              </ButtonToolbar>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default reduxForm({
  form: 'add_schedule_form',
})(connect(mapStateToProps, mapDispatchToProps)(EditScheduleModal));
