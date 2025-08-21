/* eslint-disable no-alert */
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import Alert from 'sweetalert2';

// must manually import the stylesheets for each plugin
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// import './styles.css';
import '../../scss/component/full-calendar.scss';


export default class DemoCalendar extends React.Component {
  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: 'Event Now', start: new Date(), end: new Date() },
      { title: 'Okay', start: new Date(), end: new Date() },
    ],
  };

  calendarComponentRef = React.createRef();

  eventClick = (eventClick) => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div class='table-responsive'>
      <table class='table'>
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>${
        eventClick.event.title
        }</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ${
        eventClick.event.start
        }
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove Event',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire('Deleted!', 'Your Event has been deleted.', 'success');
      }
    });
  };

  handleDateClick = (arg) => {
    if (window.confirm(`Would you like to add an event to ${arg.dateStr} ?`)) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };

  // toggleWeekends = () => {
  //   this.setState({
  //     // update a property
  //     calendarWeekends: !this.state.calendarWeekends,
  //   });
  // };

  // gotoPast = () => {
  //   const calendarApi = this.calendarComponentRef.current.getApi();
  //   calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  // };

  render() {
    return (
      <div className="demo-app">
        {/* <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
          &nbsp; (also, click a date/time to add an event)
        </div> */}
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            editable
            droppable
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            eventClick={this.eventClick}
          />
        </div>
      </div>
    );
  }
}
