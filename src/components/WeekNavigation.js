import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeWeekThunk } from '../actions';

function WeekNavigation({selectedWeekStartDate, dispatch}) {

    var now = moment();
    var nextYear = moment().endOf("year");
    

    return (
        <div>
            <h2>{moment().format("MMM D")}</h2>
            <h3>Your torture ends {now.to(nextYear)} till 2019. <br />Bring up your focus and productivity!</h3>
            <button onClick={() => dispatch(changeWeekThunk({back: true}))}>Back</button>
            <button onClick={() => dispatch(changeWeekThunk({forward: true}))}>Forward</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedWeekStartDate: state.main.selectedWeekStartDate
})

export default connect(mapStateToProps)(WeekNavigation);