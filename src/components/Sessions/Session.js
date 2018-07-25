import React from 'react';

function Session ({name, where, when}) {
    return (
        <div className="session">
            <h3>{name} {where}</h3>
            <p>{when}</p>
        </div>
    )
}

export default Session