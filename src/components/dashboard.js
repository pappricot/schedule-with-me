import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getEvents} from '../actions/index';
import {clearAuth} from '../actions/auth';

import '../grid.css';

import CalendarBody from './CalendarBody';
import NavBar from './NavBar';
import Form from './Form';
import { showForm, scheduleEvent } from '../actions';
import RequiresLogin  from './requires-login';
import WeekNavigation from './WeekNavigation';

import {fetchProtectedData} from '../actions/protected-data';
import Sessions from './Sessions/Sessions';




export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.flattenEvents = this.flattenEvents.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
    this.props.dispatch(getEvents());
  }

  flattenEvents(eventsToFlatten) {
  
    const eventArr = [];
    
    const dayKeys = Object.keys(eventsToFlatten)
    
    for (let i = 0; i< dayKeys.length; i++) {
      const dayKey = dayKeys[i];
      const dayValue = eventsToFlatten[dayKey] 
      const hourKeys = Object.keys(dayValue)
      for(let j = 0; j < hourKeys.length; j++) {
        const hourKey = hourKeys[j];
        const hourValue = dayValue[hourKey];
        const timeSlotKeys = Object.keys(hourValue)
        for(let k = 0; k < timeSlotKeys.length; k++) {
          const timeSlotKey = timeSlotKeys[k]
          const eventValue = hourValue[timeSlotKey]

          // ONLY PUSH IF isOwner or isJoiner

          const {joiners, owner} = eventValue;
          const isJoiner = joiners && joiners.map(u => u.username).includes(this.props.currentUsername)
          const isOwner = owner && owner.username === this.props.currentUsername

          if (isJoiner || isOwner) {
            eventArr.push(eventValue) 
          }

          
        }
      }
      
    }
    
    return eventArr
    
  }

  render() {
    return (
      <div className="container" id="background-image">
        <h1>Schedule With Me</h1>
        <br />
        <div className="col-sm-12">
        <NavBar onLogOut={() => this.props.dispatch(clearAuth())}/>
        <br />
        <Sessions sessions={this.flattenEvents(this.props.events)}
                  selectedWeekStartDate={this.props.selectedWeekStartDate}
        />
        </div>
        <br />
        <WeekNavigation />
        <br />
        {(this.props.selectedTimeSlots.length > 0) && <Form scheduleEvent={(eventToSchedule) => this.props.dispatch(scheduleEvent(eventToSchedule))}/>}
        <br />
        <CalendarBody 
          events={this.props.events} 
          onClickCell={(obj) => this.props.dispatch(showForm(obj))}
          selectedTimeSlots={this.props.selectedTimeSlots}
        />
      </div>
    );
  }
}

const mapReduxStoreToProps = reduxStore => ({
  addForm: reduxStore.main.addForm, // ...main.... because we use more than one reducer
  events: reduxStore.main.events,
  selectedTimeSlots: reduxStore.main.selectedTimeSlots,
  isLoggedIn: reduxStore.auth.currentUser,
  currentUsername: reduxStore.auth.currentUser.username,
  selectedWeekStartDate: reduxStore.main.selectedWeekStartDate
})

export default RequiresLogin()(connect(mapReduxStoreToProps)(Dashboard));
