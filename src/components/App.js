import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import LandingPage from "./landing-page";
import Dashboard from "./dashboard";
import DashboardB from "./dashboard-bootstrap";
import RegistrationPage from "./registration-page";
import { refreshAuthToken } from "../actions/auth";
import WeekNavigation from "./WeekNavigation";
import { CalendarBody } from "./CalendarBody";
import Sessions from "./Sessions/Sessions";
import NavBar from "./NavBar";
import "./App.css";

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={DashboardB} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/navbar" component={NavBar} />
        <Route exact path="sessions" component={Sessions} />
        <Route exact path="/week-navigation" component={WeekNavigation} />
        <Route exact path="/calendar" component={CalendarBody} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
