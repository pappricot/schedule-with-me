import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {getEvents} from '../actions/index';
import {clearAuth} from '../actions/auth';

import '../grid.css';

import CalendarBody from './CalendarBody';
import NavBar from './NavBar';
import { showForm } from '../actions';
import RequiresLogin  from './requires-login';
import WeekNavigation from './WeekNavigation';

import {fetchProtectedData} from '../actions/protected-data';
import Sessions from './Sessions/Sessions';




export class DashboardB extends Component {
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
        <html>
        <head>
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
        </head>
        <body>
        <div class="container">
        <div class="row">
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked admin-menu">         
                    <li><Link to="/navbar" data-target-id="widgets"><i class="fa fa-list-alt fa-fw"></i>My Account</Link></li>
                    <li><Link to="/sessions" data-target-id="pages"><i class="fa fa-file-o fa-fw"></i>Sessions</Link></li>
                    <li><Link to="/week-navigation" data-target-id="charts"><i class="fa fa-bar-chart-o fa-fw"></i>WeekNavigation</Link></li>
                    <li><Link to="/calendar" data-target-id="table"><i class="fa fa-table fa-fw"></i>Calendar</Link></li>
                </ul>
            </div>
            <div class="col-md-9 well admin-content" id="widgets">
                <NavBar onLogOut={() => this.props.dispatch(clearAuth())}/>
            </div>
            <div class="col-md-9 well admin-content" id="pages">
                <Sessions sessions={this.flattenEvents(this.props.events)}
                    selectedWeekStartDate={this.props.selectedWeekStartDate}
                />
            </div>
            <div class="col-md-9 well admin-content" id="charts">
                <WeekNavigation />
            </div>
            <div class="col-md-9 well admin-content" id="table">
                <CalendarBody 
                events={this.props.events} 
                onClickCell={(obj) => this.props.dispatch(showForm(obj))}
                selectedTimeSlots={this.props.selectedTimeSlots}
                />
            </div>
        </div>
    </div>
    </body>
    </html>
      )
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
  
export default RequiresLogin()(connect(mapReduxStoreToProps)(DashboardB));
  