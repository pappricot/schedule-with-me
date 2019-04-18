import React from "react";
import { connect } from "react-redux";
import "./ScheduleCell.css";

function ScheduleCell({
  joiners,
  currentUsername,
  owner,
  name,
  purpose,
  where,
  deleteEvents,
  requestEvent,
  cancelEvent,
  onAddSession,
  ...otherProps
}) {
  console.log("here", joiners, currentUsername);
  const areYouOwner = owner.username === currentUsername;
  const areYouAJoiner =
    joiners && joiners.map(u => u.username).includes(currentUsername);

  return (
    <div className="cell">
      <div className="info-p1">
        <p>{name}</p>
      </div>
      <div className="info-p2">
        <p>{where}</p>
      </div>
      {areYouOwner && joiners.length > 0 && (
        <p>
          <strong>Scheduled with {joiners[0].username}</strong>
        </p>
      )}
      {areYouOwner && (
        <button
          className="button btn btn-default for-phone-only for-tablet-portrait-up for-tablet-portait-only"
          onClick={e => {
            e.stopPropagation(); // to stop bubbling up and prevent the form to show up
            deleteEvents();
          }}
        >
          Delete
        </button>
      )}
      {!areYouOwner && !areYouAJoiner && (
        <div>
          <button
            className="button btn btn-default for-phone-only for-tablet-portrait-up for-tablet-portait-only"
            onClick={e => {
              e.stopPropagation();
              requestEvent();
            }}
          >
            Request
          </button>
        </div>
      )}
      {!areYouOwner && areYouAJoiner && (
        <div className="buttonWraper">
          <p className="Scheduled">
            <strong> Scheduled! </strong>
          </p>
          <button
            className="button btn btn-default for-phone-only for-tablet-portrait-up for-tablet-portait-only cancel"
            onClick={e => {
              e.stopPropagation();
              cancelEvent();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  currentUsername: state.auth.currentUser.username
});

export default connect(mapStateToProps)(ScheduleCell);
