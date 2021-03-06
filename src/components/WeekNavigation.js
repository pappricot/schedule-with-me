import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { changeWeekThunk } from "../actions";
import "./WeekNavigation.css";

function WeekNavigation({ selectedWeekStartDate, dispatch }) {
  var now = moment();
  var nextYear = moment().endOf("year");

  return (
    <div className="WeekNavigation">
      <h3>{moment().format("MMM D")}</h3>
      <h4>
        Your torture ends {now.to(nextYear)} till 2019. <br />
        Bring up your focus and productivity!
      </h4>
      <button
        className="btn arrow"
        id="Back"
        onClick={() => dispatch(changeWeekThunk({ back: true }))}
      >
        &#10094;
      </button>
      <button
        className="btn arrow"
        id="Forward"
        onClick={() => dispatch(changeWeekThunk({ forward: true }))}
      >
        &#10095;
      </button>
    </div>
  );
}

const mapStateToProps = state => ({
  selectedWeekStartDate: state.main.selectedWeekStartDate
});

export default connect(mapStateToProps)(WeekNavigation);
