import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeWeek } from '../actions';
import { change } from 'redux-form';

function WeekNavigation({selectedWeekStartDate, dispatch}) {
    return (
        <div>
            <h2>{moment(selectedWeekStartDate).format("MMM D")}</h2>
            <button onClick={() => dispatch(changeWeek({back: true}))}>Back</button>
            <button onClick={() => dispatch(changeWeek({forward: true}))}>Forward</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedWeekStartDate: state.main.selectedWeekStartDate
})

export default connect(mapStateToProps)(WeekNavigation);