import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeWeekThunk } from '../actions';

function WeekNavigation({selectedWeekStartDate, dispatch}) {

    var now = moment();
    var nextYear = moment().endOf("year");
    

    return (
        <div className="WeekNavigation col-sm-12">
            <h2>{moment().format("MMM D")}</h2>
            <h3>Your torture ends {now.to(nextYear)} till 2019. <br />Bring up your focus and productivity!</h3>
            <button className="button btn btn-default"id="Back" onClick={() => dispatch(changeWeekThunk({back: true}))}>&#10094;</button>
            <button className="button btn btn-default" id="Forward" onClick={() => dispatch(changeWeekThunk({forward: true}))}>&#10095;</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedWeekStartDate: state.main.selectedWeekStartDate
})

export default connect(mapStateToProps)(WeekNavigation);