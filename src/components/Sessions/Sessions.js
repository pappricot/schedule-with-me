import React, { Component } from 'react';
import Session from "./Session";

class Sessions extends Component {

    render() {
        const sessions = (this.props.sessions) ? this.props.sessions.map((session, index) =>
            <li key={index}>
                <Session {...session} />
            </li>
        ) : null;
        return (
            <div className="Sessions">
                {sessions}
            </div>
        )
    }
}

export default Sessions;