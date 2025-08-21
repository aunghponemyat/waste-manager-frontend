/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
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
  getTrainingList,
  addNewTraining,
  changeTrainingDate,
  changeTrainingDateWithPromise,
  deleteTrainingWithPromise,
} from '../../../../../redux/actions/apiActions/trainingActions';
import AddToScheduleModal from './AddToScheduleModal';
import EditScheduleModal from './EditScheduleModal';

class TrainingCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddSchedule = this.handleAddSchedule.bind(this);
    // this.submitTimeChange = this.submitTimeChange.bind(this);
  }

  state = {
    calendarWeekends: true,
    calendarEvents: null,
    trainings: null,
    date: null,
    openModal: false,
    openEditModal: false,
    clickedTraining: null,
  };

  componentWillMount() {
    this.props.getTrainingList();
  }

  shouldComponentUpdate(nextState, nextProps) {
    if (nextState !== this.state || nextProps !== this.props) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.trainings.list && this.props.trainings.list !== this.state.trainings) {
      const trainings = this.props.trainings.list;
      const events = [];
      Object.keys(trainings).forEach((key) => {
        const startDate = new Date(trainings[key].trainingDate);
        const event = {
          title: trainings[key].organizationId.name,
          training: trainings[key],
          start: startDate,
          end: new Date(startDate.getTime() + (15 * 60000)),
          backgroundColor: '#555',
          borderColor: '#555',
          textColor: '#fff',
        };
        events.push(event);
      });
      if (this.state.calendarEvents !== events) {
        this.updateEvents(events);
      }
    }
  }

  updateEvents(events) {
    this.setState({
      calendarEvents: events,
      trainings: this.props.trainings.list,
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
    // console.log(eventClick.event._instance.range.start);
    let clickedDate = eventClick.event._instance.range.start;
    clickedDate = new Date(clickedDate.getTime() - (390 * 60000));
    this.setState({
      openEditModal: true,
      clickedTraining: eventClick.event.extendedProps.training,
      date: clickedDate,
    });
  };

  handleDateClick = (arg) => {
    const calendarApi = this.calendarComponentRef.current.getApi();
    // console.log(arg);
    // calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
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
    addNewTraining({ organizationId: value.organizationId }, this.state.date)
      .then((response) => {
        console.log(response);
        this.setState({
          // add new event data
          calendarEvents: this.state.calendarEvents.concat({
            // creates a new array
            title: value.organizationId.label,
            training: response,
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
    this.props.changeTrainingDate(
      info.event.extendedProps.training._id,
      changedDate,
    );
  }

  submitTimeChange = (trainingId, date) => {
    changeTrainingDateWithPromise(
      trainingId,
      date,
    ).then(() => {
      this.setState({
        openEditModal: false,
      });
      window.location.reload();
    });
  }

  deleteSchedule = (trainingId) => {
    deleteTrainingWithPromise(trainingId)
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
            title="Change Training Date"
            date={this.state.date}
            organization="Organization"
            training={this.state.clickedTraining}
            isOpen={this.state.openEditModal}
            closeModal={this.handleCloseEditModal}
            onSubmit={this.handleAddSchedule}
            handleTimeChange={this.handleTimeChange}
            submitTimeChange={(trainingId, date) => this.submitTimeChange(
              trainingId,
              date,
            )}
            handleDeleteSchedule={trainingId => this.deleteSchedule(trainingId)}
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
  getTrainingList: () => {
    dispatch(getTrainingList());
  },
  changeTrainingDate: (trainingId, trainingDate) => {
    dispatch(changeTrainingDate(trainingId, trainingDate));
  },
});

const mapStateToProps = state => ({
  trainings: state.trainings,
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCalendar);
