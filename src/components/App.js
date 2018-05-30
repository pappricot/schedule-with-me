import React, { Component } from 'react';
import './App.css';
import CalendarBody from './CalendarBody';
import NavBar from './NavBar';
import Form from './Form';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      addForm: false,
      selectedWeekday: null,
      selectedHour: null,
      selectedTimeSlot: null,
      events: {}
    }
  }

  onClickCell = ({weekday, hour, timeSlot}) => {
    console.log(weekday, hour, timeSlot)
    this.setState({
      addForm: true,
      selectedWeekday: weekday,
      selectedHour:hour,
      selectedTimeSlot: timeSlot
    })
  }

  scheduleEvent = (eventToAdd) => {
    console.log(eventToAdd);
    // destructuring
    const {events, selectedWeekday, selectedHour, selectedTimeSlot} = this.state;
    events[selectedWeekday] = events[selectedWeekday] || {};
    events[selectedWeekday][selectedHour] = events[selectedWeekday][selectedHour] || {};
    events[selectedWeekday][selectedHour][selectedTimeSlot] = eventToAdd;

    console.log(`events is ${JSON.stringify(events)}`)
    console.log(`events[selectedWeekday] is ${JSON.stringify(events[selectedWeekday])}`)
    console.log(`events[selectedWeekday][selectedHour] is ${JSON.stringify(events[selectedWeekday][selectedHour])}`)
    console.log(`events[selectedWeekday][selectedHour][selectedTimeSlot] is ${JSON.stringify(events[selectedWeekday][selectedHour][selectedTimeSlot])}`)

    this.setState({
      addForm: false,
      selectedWeekday: null,
      selectedHour: null,
      selectedTimeSlot:null,
      events
    })
  }

  render() {
    return (
      <div className="App" id="background-image">
        <h1>Schedule With Me</h1>
        <br />
        <NavBar />
        <br />
        {(this.state.addForm) && <Form scheduleEvent={this.scheduleEvent}/>}
        <br />
        <CalendarBody events={this.state.events} onClickCell={this.onClickCell}/>
      </div>
    );
  }
}

export default App;
