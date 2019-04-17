import React from 'react';

function Session ({name, where}) {
    return (
        <div className="session">
            <p>{name} at {where}</p>
            <hr />
        </div>
    )
}

export default Session