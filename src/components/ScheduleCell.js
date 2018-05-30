import React from 'react';

export function ScheduleCell(props) {
        return (
            <div className="cell">
                <h3>{props.name}</h3>
                <p>{props.where}</p>
                <p>{props.when}</p>
            </div>
        )
}