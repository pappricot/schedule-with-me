import React from "react";
import "./session.css";
function Session({ name, where }) {
  return (
    <div className="session">
      <p className="sessionText">
        {name} at {where}
      </p>
      <hr />
    </div>
  );
}

export default Session;
