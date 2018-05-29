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
      selectedTimeSlot: null
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
    console.log(eventToAdd)
    this.setState({
      addForm: false,
      selectedWeekday: null,
      selectedHour: null,
      selectedTimeSlot:null
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Schedule With Me</h1>
        <br />
        <NavBar />
        <br />
        {(this.state.addForm) && <Form scheduleEvent={this.scheduleEvent}/>}
        <br />
        <CalendarBody onClickCell={this.onClickCell} />
      </div>
    );
  }
}

export default App;
