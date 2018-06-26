import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getEvents} from '../actions/index';

import './dashboard.css';

import CalendarBody from './CalendarBody';
import NavBar from './NavBar';
import Form from './Form';
import { showForm, scheduleEvent } from '../actions';

import {fetchProtectedData} from '../actions/protected-data';

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
    this.props.dispatch(getEvents())
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
