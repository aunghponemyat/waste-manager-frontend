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
import '../../../../scss/component/full-calendar.scss';

import {
  getLogisticsByOrganization,
} from '../../../../redux/actions/apiActions/logisticsActions';

class ScheduleCalendar extends React.Component {
  state = {
    calendarWeekends: true,
    calendarEvents: null,
    logistics: null,
  };

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.props.getLogisticsByOrganization(user.organizationId._id);
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
        const event = {
          title: logistics[key].organizationId.name,
          logistics: logistics[key],
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
      logistics: this.props.logistics.list,
    });
  }

  calendarComponentRef = React.createRef();

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-calendar">
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
  getLogisticsByOrganization: (organizationId) => {
    dispatch(getLogisticsByOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar);
