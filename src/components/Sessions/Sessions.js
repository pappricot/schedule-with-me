import React, { Component } from 'react';
import Session from "./Session";

class Sessions extends Component {

    render() {
        const sessions = (this.props.sessions) ? this.props.sessions.map((session, index) =>
            <li key={index}>
                <Session {...session} />
            </li>
        ) : null;

        if (this.props.selectedWeekStartDate /**&& (this.props.joiners > 0)**/) {
            return (
                <div className="Sessions">
                    {(sessions.length>0) ?
                    <h4>Upcoming sessions</h4> :
                    <p>Nothing scheduled yet</p>
                    }
                    
                    <ul>
                        {sessions}
                    </ul>
                </div>
            )
        }
        
    }
}

export default Sessions;