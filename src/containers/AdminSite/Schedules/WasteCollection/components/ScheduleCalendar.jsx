/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import Alert from 'sweetalert2';
import { connect } from 'react-redux';

// must manually import the stylesheets for each plugin
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '../../../../../scss/component/full-calendar.scss';

import {
  getLogisticsScheduleList,
  addNewLogistics,
  changePickUpTime,
  changePickUpTimeWithPromise,
  deleteScheduleWithPromise,
} from '../../../../../redux/actions/apiActions/logisticsActions';
import AddToScheduleModal from './AddToScheduleModal';
import EditScheduleModal from './EditScheduleModal';

class ScheduleCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddSchedule = this.handleAddSchedule.bind(this);
    // this.submitTimeChange = this.submitTimeChange.bind(this);
  }

  state = {
    calendarWeekends: true,
    calendarEvents: null,
    logistics: null,
    date: null,
    openModal: false,
    openEditModal: false,
    clickedLogistics: null,
  };

  componentWillMount() {
    this.props.getLogisticsScheduleList();
  }

  shouldComponentUpdate(nextState, nextProps) {
    if (nextState !== this.state || nextProps !== this.props) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.logistics.list && this.props.logistics.list !== this.state.logistics) {
      const logistics = this.props.logistics.list;
      const events = [];
      Object.keys(logistics).forEach((key) => {
        const startDate = new Date(logistics[key].pickUpTime);
        // console.log(logistics.wayType);
        const event = {
          className: logistics[key].wayType !== 'undefined' && logistics[key].wayType === 'Dry' ? 'schedule_wayType_blue' : (logistics[key].wayType === 'Organic' ? 'schedule_wayType_green' : ''),
          title: logistics[key].organizationId.name,
          logistics: logistics[key],
          start: startDate,
          end: new Date(startDate.getTime() + (15 * 60000)),
          backgroundColor: '#555',
          borderColor: '#555',
          textColor: '#fff',
        };
        events.push(event);
        // logistics[key].wayType !== null && console.log(logistics[key].wayType);
      });
      if (this.state.calendarEvents !== events) {
        this.updateEvents(events);
      }
    }
  }

  updateEvents(events) {
    this.setState({
      calendarEvents: events,
      logistics: this.props.logistics.list,
    });
  }

  calendarComponentRef = React.createRef();


  // eventClick = (eventClick) => {
  //   console.log(eventClick.event.extendedProps.logistics);
  //   Alert.fire({
  //     title: eventClick.event.title,
  //     html:
  //       `<div class='table-responsive'>
  //     <table class='table'>
  //     <tbody>
  //     <tr >
  //     <td>Organization</td>
  //     <td><strong>${
  //       eventClick.event.title
  //       }</strong></td>
  //     </tr>
  //     <tr >
  //     <td>Start Time</td>
  //     <td><strong>
  //     ${
  //       eventClick.event.start
  //       }
  //     </strong></td>
  //     </tr>
  //     </tbody>
  //     </table>
  //     </div>`,

  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Remove Event',
  //     cancelButtonText: 'Close',
  //   }).then((result) => {
  //     if (result.value) {
  //       eventClick.event.remove(); // It will remove event from the calendar
  //       Alert.fire('Deleted!', 'Your Event has been deleted.', 'success');
  //     }
  //   });
  // };
  eventClick = (eventClick) => {
    console.log(eventClick);
    // console.log(eventClick.event._instance.range.start);
    let clickedDate = eventClick.event._instance.range.start;
    clickedDate = new Date(clickedDate.getTime() - (390 * 60000));
    this.setState({
      openEditModal: true,
      clickedLogistics: eventClick.event.extendedProps.logistics,
      date: clickedDate,
    });
  };

  handleDateClick = (arg) => {
    console.log('zzz');
    const calendarApi = this.calendarComponentRef.current.getApi();
    if (arg.allDay) {
      calendarApi.changeView('timeGridDay', arg.date);
    } else {
      this.setState({ date: arg.date, openModal: true });
    }
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  }

  handleCloseEditModal = () => {
    this.setState({ openEditModal: false });
  }

  handleAddSchedule = (value) => {
    const data = {
      organizationId: value.organizationId.value,
      pickUpTime: this.state.date,
    };
    if (data.plate_number && data.driver) {
      data.vehicle = {
        plate_number: data.plate_number,
        driver: data.driver.value,
      };
      delete data.driver;
      delete data.plate_number;
    }
    addNewLogistics(data)
      .then((response) => {
        this.setState({
          // add new event data
          calendarEvents: this.state.calendarEvents.concat({
            // creates a new array
            title: value.organizationId.label,
            logistics: response,
            start: this.state.date,
            end: new Date(this.state.date.getTime() + (15 * 60000)),
            backgroundColor: '#555',
            borderColor: '#555',
            textColor: '#fff',
          }),
          openModal: false,
        });
      });
  }

  handleTimeChange = date => this.setState({ date })

  eventDrop = (info) => {
    let changedDate = info.event._instance.range.start;
    changedDate = new Date(changedDate.getTime() - (390 * 60000));
    this.props.changePickUpTime(
      info.event.extendedProps.logistics._id,
      changedDate,
    );
  }

  submitTimeChange = (logisticsId, date) => {
    changePickUpTimeWithPromise(
      logisticsId,
      date,
    ).then(() => {
      this.setState({
        openEditModal: false,
      });
      window.location.reload();
    });
  }

  deleteSchedule = (logisticsId) => {
    // console.log(logisticsId);
    deleteScheduleWithPromise(logisticsId)
      .then((res) => {
        console.log(res);
        this.setState({
          openEditModal: false,
        });
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-calendar">
          <AddToScheduleModal
            title="Add Schedule"
            date={this.state.date}
            isOpen={this.state.openModal}
            closeModal={this.handleCloseModal}
            onSubmit={this.handleAddSchedule}
            handleTimeChange={this.handleTimeChange}
          />
          <EditScheduleModal
            title="Change Pickup Time"
            date={this.state.date}
            organization="Organization"
            logistics={this.state.clickedLogistics}
            isOpen={this.state.openEditModal}
            closeModal={this.handleCloseEditModal}
            onSubmit={this.handleAddSchedule}
            handleTimeChange={this.handleTimeChange}
            submitTimeChange={(logisticsId, date) => this.submitTimeChange(
              logisticsId,
              date,
            )}
            handleDeleteSchedule={logisticsId => this.deleteSchedule(logisticsId)}
            // submitTimeChange={(logisticsId, date) => console.log(logisticsId, date)}
          />
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            timeZone="local"
            editable
            droppable
            eventDrop={info => this.eventDrop(info)}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            eventClick={this.eventClick}
            slotDuration="00:15:00"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogisticsScheduleList: () => {
    dispatch(getLogisticsScheduleList());
  },
  changePickUpTime: (logisticsId, pickUpTime) => {
    dispatch(changePickUpTime(logisticsId, pickUpTime));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar);
