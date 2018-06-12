import React, { Component } from 'react';
import {connect} from 'react-redux';

import './dashboard.css';

import CalendarBody from './CalendarBody';
import NavBar from './NavBar';
import Form from './Form';
import { showForm, scheduleEvent } from '../actions';

import {fetchProtectedData} from '../actions/protected-data';

class Dashboard extends Component {

  // constructor(props){
  //   super(props);
  //   this.state={
  //     addForm: false,
  //     selectedWeekday: null,
  //     selectedHour: null,
  //     selectedTimeSlot: null,
  //     events: {}
  //   }
  // }

  // onClickCell = ({weekday, hour, timeSlot}) => {
  //   console.log(weekday, hour, timeSlot)
  //   this.setState({
  //     addForm: true,
  //     selectedWeekday: weekday,
  //     selectedHour:hour,
  //     selectedTimeSlot: timeSlot
  //   })
  // }

  // scheduleEvent = (eventToAdd) => {
  //   console.log(eventToAdd);
  //   // destructuring
  //   const {events, selectedWeekday, selectedHour, selectedTimeSlot} = this.state;
  //   console.log('events', events);
  //   events[selectedWeekday] = events[selectedWeekday] || {};
  //   events[selectedWeekday][selectedHour] = events[selectedWeekday][selectedHour] || {};
  //   events[selectedWeekday][selectedHour][selectedTimeSlot] = eventToAdd;

  //   console.log(`events is ${JSON.stringify(events)}`)
  //   console.log(`events[selectedWeekday] is ${JSON.stringify(events[selectedWeekday])}`)
  //   console.log(`events[selectedWeekday][selectedHour] is ${JSON.stringify(events[selectedWeekday][selectedHour])}`)
  //   console.log(`events[selectedWeekday][selectedHour][selectedTimeSlot] is ${JSON.stringify(events[selectedWeekday][selectedHour][selectedTimeSlot])}`)

  //   this.setState({
  //     addForm: false,
  //     selectedWeekday: null,
  //     selectedHour: null,
  //     selectedTimeSlot:null,
  //     events
  //   })
  // }

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="App" id="background-image">
        <h1>Schedule With Me</h1>
        <br />
        <NavBar />
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
  selectedTimeSlots: reduxStore.main.selectedTimeSlots
})

export default connect(mapReduxStoreToProps)(Dashboard);
