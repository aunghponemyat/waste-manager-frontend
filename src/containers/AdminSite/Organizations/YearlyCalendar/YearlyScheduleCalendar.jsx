/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */

import React from 'react';
import moment from 'moment';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import { connect } from 'react-redux';

import { Modal, Button } from 'reactstrap';
import {
  getLogisticsByOrganization,
} from '../../../../redux/actions/apiActions/logisticsActions';
import history from '../../../../shared/utils/history';

// const customCSSclasses = {
//   pickupDates: ['2019-04-25', '2019-05-25', '2019-06-25', '2019-08-25', '2019-11-25'],
// };

class YearlyCalendar extends React.Component {
  state = {
    year: new Date().getFullYear(),
    Cancelled: null,
    OnHold: null,
    Confirmed: null,
    Completed: null,
    Requested: null,
    logistics: null,
    logisticsDetails: {},
    isOpen: false,
    pickedDate: null,
    updated: false,
  };

  componentWillMount() {
    // const user = JSON.parse(localStorage.getItem('user'));
    this.props.getLogisticsByOrganization(this.props.organizationId);
  }

  componentDidUpdate() {
    this.props.getLogisticsByOrganization(this.props.organizationId);
    if (this.props.logistics.list && this.props.logistics.list !== this.state.logistics && this.state.updated === false) {
      const logistics = this.props.logistics.list;
      const Confirmed = [];
      const Cancelled = [];
      const OnHold = [];
      const Completed = [];
      const Requested = [];
      const logisticsDetails = {};
      Object.keys(logistics).forEach((key) => {
        let pickupDate = new Date(logistics[key].pickUpTime);
        pickupDate = `${pickupDate.getFullYear()}-${(`0${pickupDate.getMonth() + 1}`).slice(-2)}-${(`0${pickupDate.getDate()}`).slice(-2)}`;
        // console.log(pickupDate);
        logistics[key].status && logistics[key].status === 'REQUESTED' ?
          // console.log(logistics[key].statuss)
          Requested.push(pickupDate)
          :
          (logistics[key].status === 'COMPLETED' ?
            Completed.push(pickupDate)
            :
            (logistics[key].status === 'CANCELLED' ?
              Cancelled.push(pickupDate)
              :
              (logistics[key].status === 'CONFIRMED' ?
                Confirmed.push(pickupDate)
                :
                OnHold.push(pickupDate)
              )
            )
          );
        // console.log('cm');
        // console.log(Completed + Requested);
        logisticsDetails[pickupDate] = logistics[key];
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        logistics, logisticsDetails, Completed, Requested, Confirmed, OnHold, Cancelled, updated: true,
      });
      // console.log(Requested);
    }
  }

  onPrevYear() {
    this.setState(prevState => ({
      year: prevState.year - 1,
    }));
  }

  onNextYear() {
    this.setState(prevState => ({
      year: prevState.year + 1,
    }));
  }


  goToToday() {
    const today = moment();

    this.setState({
      year: today.year(),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  datePicked(date, classes) {
    if (classes) {
      let pickedDate = new Date(this.state.logisticsDetails[date.format('YYYY-MM-DD')].pickUpTime);
      pickedDate = `${pickedDate.getFullYear()}-${(`0${pickedDate.getMonth() + 1}`).slice(-2)}-${(`0${pickedDate.getDate()}`).slice(-2)} ${pickedDate.getHours()}:${pickedDate.getMinutes() < 10 ? '0' : ''}${pickedDate.getMinutes()}`;
      this.setState({
        pickedDate,
        isOpen: true,
      });
    }
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  }

  goToDetail = () => {
    const date = this.state.pickedDate.split(' ')[0];
    const logisticsId = this.state.logisticsDetails[date]._id;
    history.push(`/schedule/waste-collection/${logisticsId}`);
    window.location.reload();
  }


  render() {
    const {
      year, Completed, Requested, isOpen, Confirmed, OnHold, Cancelled,
    } = this.state;
    console.log(Requested);
    const { logistics } = this.props;
    let pickupData = null;
    // console.log(pickupDates);
    return (
      <div>
        <CalendarControls
          year={year}
          // showTodayButton
          onPrevYear={() => this.onPrevYear()}
          onNextYear={() => this.onNextYear()}
          goToToday={() => this.goToToday()}
        />
        {/* { Completed &&
          <Calendar
            year={year}
            // showDaysOfWeek={false}
            customClasses={{ Completed }}
            onPickDate={(date, classes) => this.datePicked(date, classes)}
            // className={logistics.list &&
            //   Object.keys(logistics.list).forEach((key) => {
            //     let pickupDate = new Date(logistics.list[key].pickUpTime);
            //     pickupDate = `${pickupDate.getFullYear()}-${(`0${pickupDate.getMonth() + 1}`).slice(-2)}-${(`0${pickupDate.getDate()}`).slice(-2)} ${pickupDate.getHours()}:${pickupDate.getMinutes() < 10 ? '0' : ''}${pickupDate.getMinutes()}`;
            //     // console.log(pickupDate);
            //     pickupDate === this.state.pickedDate ?
            //     (logistics.list[key].status === 'Requsted' ?
            //       (logistics.list[key].wayType && logistics.list[key].wayType === 'Dry' ? 'schedule_wayType_blue' : (logistics.list[key].wayType === 'Organic' ? 'schedule_wayType_green' : ''))
            //       :
            //       console.log('no'))
            //     :
            //     console.log('no');
            //   })
            // }
            // className="test"
            style={{ color: 'red' }}
          />
        } */}
        {/* {console.log(Completed)} */}
        {Requested && Completed && Confirmed && Cancelled && OnHold &&
          <Calendar
            year={year}
            // showDaysOfWeek={false}
            customClasses={{
              Requested, Completed, Confirmed, Cancelled, OnHold,
            }}
            onPickDate={(date, classes) => this.datePicked(date, classes)}
            // className={logistics.list &&
            //   Object.keys(logistics.list).forEach((key) => {
            //     let pickupDate = new Date(logistics.list[key].pickUpTime);
            //     pickupDate = `${pickupDate.getFullYear()}-${(`0${pickupDate.getMonth() + 1}`).slice(-2)}-${(`0${pickupDate.getDate()}`).slice(-2)} ${pickupDate.getHours()}:${pickupDate.getMinutes() < 10 ? '0' : ''}${pickupDate.getMinutes()}`;
            //     // console.log(pickupDate);
            //     pickupDate === this.state.pickedDate ?
            //     (logistics.list[key].status === 'Requsted' ?
            //       (logistics.list[key].wayType && logistics.list[key].wayType === 'Dry' ? 'schedule_wayType_blue' : (logistics.list[key].wayType === 'Organic' ? 'schedule_wayType_green' : ''))
            //       :
            //       console.log('no'))
            //     :
            //     console.log('no');
            //   })
            // }
            // className="test"
          />
        }
        <Modal
          isOpen={isOpen}
          className="modal-dialog--success"
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.closeModal} />
            <h4 className="bold-text  modal__title">Pickup Time</h4>
          </div>
          {this.state.pickedDate && logistics.list &&
            <div className="modal__body">
              <p>{new Date(this.state.pickedDate).toDateString()} {new Date(this.state.pickedDate).toLocaleTimeString()} - {new Date(new Date(this.state.pickedDate).setMinutes(new Date(this.state.pickedDate).getMinutes() + 30)).toLocaleTimeString()}</p>
              {/* <p>{logistics}</p> */}
              <div>
                {
                  Object.keys(logistics.list).forEach((key) => {
                    let pickupDate = new Date(logistics.list[key].pickUpTime);
                    pickupDate = `${pickupDate.getFullYear()}-${(`0${pickupDate.getMonth() + 1}`).slice(-2)}-${(`0${pickupDate.getDate()}`).slice(-2)} ${pickupDate.getHours()}:${pickupDate.getMinutes() < 10 ? '0' : ''}${pickupDate.getMinutes()}`;
                    // console.log(pickupDate);
                    pickupDate === this.state.pickedDate ? (pickupData = logistics.list[key].status) : console.log('no');
                  })
                }
              </div>
              {/* {console.log(logistics.list)} */}
              {/* {console.log(this.state.pickedDate)} */}
              <p>{pickupData}</p>
              <Button
                className="icon"
                color="success"
                style={{ marginTop: 10 }}
                // eslint-disable-next-line react/prop-types
                onClick={() => this.goToDetail()}
              >
                <p>Go To Detail</p>
              </Button>
            </div>
          }
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogisticsByOrganization: (organizationId) => {
    dispatch(getLogisticsByOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(YearlyCalendar);
