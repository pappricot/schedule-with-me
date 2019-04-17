import React, { Component } from "react";
import Session from "./Session";
import "./session.css";

class Sessions extends Component {
  render() {
    const sessions = this.props.sessions
      ? this.props.sessions.map((session, index) => (
          <li key={index}>
            <Session {...session} />
          </li>
        ))
      : null;

    if (this.props.selectedWeekStartDate /**&& (this.props.joiners > 0)**/) {
      return (
        <div>
          {sessions.length > 0 ? (
            <h5>Upcoming sessions</h5>
          ) : (
            <p>Nothing scheduled yet</p>
          )}

          <ul className="sessions">{sessions}</ul>
        </div>
      );
    }
  }
}

export default Sessions;
