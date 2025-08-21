/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */

import React from 'react';
import moment from 'moment';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import { connect } from 'react-redux';

import { Modal } from 'reactstrap';
import {
  getLogisticsByOrganization,
} from '../../../../redux/actions/apiActions/logisticsActions';


// const customCSSclasses = {
//   pickupDates: ['2019-04-25', '2019-05-25', '2019-06-25', '2019-08-25', '2019-11-25'],
// };

class YearlyCalendar extends React.Component {
  state = {
    year: new Date().getFullYear(),
    logistics: null,
    Cancelled: null,
    OnHold: null,
    Confirmed: null,
    Completed: null,
    Requested: null,
    logisticsDetails: {},
    isOpen: false,
    pickedDate: null,
    pickedLogistics: null,
    updated: false,
  };

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.props.getLogisticsByOrganization(user.organizationId._id);
  }

  componentDidUpdate() {
    if (this.props.logistics.list && this.props.logistics.list !== this.state.logistics && this.state.updated === false) {
      const logistics = this.props.logistics.list;
      // const pickupDates = [];
      const Confirmed = [];
      const Cancelled = [];
      const OnHold = [];
      const Completed = [];
      const Requested = [];
      const logisticsDetails = {};
      Object.keys(logistics).forEach((key) => {
        let pickupDate = new Date(logistics[key].pickUpTime);
        pickupDate = `${pickupDate.getFullYear()}-${(`0${pickupDate.getMonth() + 1}`).slice(-2)}-${(`0${pickupDate.getDate()}`).slice(-2)}`;
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
        logisticsDetails[pickupDate] = logistics[key];
        // pickupDates.push(pickupDate);
      });
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({
      //   pickupDates, logistics, logisticsDetails,
      // });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        logistics, logisticsDetails, Completed, Requested, Confirmed, OnHold, Cancelled, updated: true,
      });
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
      if (!Object.keys(this.state.logisticsDetails).includes(date.format('YYYY-MM-DD'))) {
        alert('No Pickup Found on that date!');
      } else {
        let pickedDate = new Date(this.state.logisticsDetails[date.format('YYYY-MM-DD')].pickUpTime);
        pickedDate = `${pickedDate.getFullYear()}-${(`0${pickedDate.getMonth() + 1}`).slice(-2)}-${pickedDate.getDate()} ${pickedDate.getHours()}:${pickedDate.getMinutes() < 10 ? '0' : ''}${pickedDate.getMinutes()}`;
        const pickedLogistics = this.state.logisticsDetails[date.format('YYYY-MM-DD')];
        this.setState({
          pickedDate,
          isOpen: true,
          pickedLogistics,
        });
      }
    }
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  }

  formatDate = (date) => {
    const newDate = moment(date, 'YYYY-MM-DD HH:mm').toDate().toDateString();
    return newDate;
  }

  formatTime = (date) => {
    const newDate = moment(date, 'YYYY-MM-DD HH:mm').toDate().toLocaleTimeString();
    return newDate;
  }

  format30MinTime = (date) => {
    let newDate = moment(date, 'YYYY-MM-DD HH:mm').toDate();
    newDate = new Date(new Date(newDate).setMinutes(new Date(newDate).getMinutes() + 30)).toLocaleTimeString();
    return newDate;
  }


  render() {
    const {
      year, Completed, Requested, Confirmed, OnHold, Cancelled,
      isOpen,
      pickedLogistics,
    } = this.state;
    return (
      <div>
        <CalendarControls
          year={year}
          // showTodayButton
          onPrevYear={() => this.onPrevYear()}
          onNextYear={() => this.onNextYear()}
          goToToday={() => this.goToToday()}
        />
        {Requested && Completed && Confirmed && Cancelled && OnHold &&
          <Calendar
            year={year}
            // showDaysOfWeek={false}
            customClasses={{
              Requested, Completed, Confirmed, Cancelled, OnHold,
            }}
            onPickDate={(date, classes) => this.datePicked(date, classes)}
          />
        }
        <Modal
          isOpen={isOpen}
          className="modal-dialog--success"
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.closeModal} />
            <h4 className="bold-text  modal__title">Detailed Pickup Information</h4>
          </div>
          {this.state.pickedDate &&
            <div className="modal__body">
              <p>{this.formatDate(this.state.pickedDate)} {this.formatTime(this.state.pickedDate)} - {this.format30MinTime(this.state.pickedDate)}</p>
              <p>Status: {pickedLogistics.status}</p>
              {JSON.stringify(pickedLogistics.items) !== '[]' &&
                <div>
                  <h5 className="bold-text  modal__title" style={{ marginTop: 50 }}>Collected Data</h5>
                  <table className="table" style={{ width: 300, margin: '0 auto' }}>
                    <tr>
                      <th style={{ textAlign: 'left' }}>
                        Item Name
                      </th>
                      <th style={{ textAlign: 'right' }}>
                        Quantity
                      </th>
                    </tr>
                    {pickedLogistics.items.map(prop =>
                      (
                        <tr>
                          <td style={{ textAlign: 'left' }}>{prop.productName}</td>
                          <td style={{ textAlign: 'right' }}>{prop.quantity} kg</td>
                        </tr>
                      ))}
                  </table>
                </div>
              }
            </div>
          }
          <p style={{ textAlign: 'center' }}>
            <table>
              <tr>
                <td style={{ width: '10%', textAlign: 'right' }}><span className="lnr lnr-warning" style={{ color: '#ffae42', fontSize: 'xxx-large' }} /></td>
                <td style={{ width: '80%' }}>
                  If you would like to change the pickup time or request a new schedule, please send an email to&nbsp;<br />
                  <a href="mailto: operations@recyglo.com">operations@recyglo.com</a>
                  &nbsp;or call&nbsp;
                  <a href="tel: +95940245800">+959-40245800</a>
                </td>
              </tr>
            </table>
          </p>
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
