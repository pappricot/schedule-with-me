import {SHOW_FORM, DRAG_CELLS, FINISH_DRAGGING_CELLS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE, DELETE_EVENTS_SUCCESS, REQUEST_EVENT_SUCCESS, CHANGE_WEEK} from '../actions';
import moment from 'moment';

const initialState = {
    addForm: false,
    events: {},
    isMouseDown: false,
    highlighted: 'highlighted',
    selectedTimeSlots: [],
    selectedWeekStartDate: moment().startOf('isoWeek').toDate() // start on Monday
}

export default (state=initialState, action) => {

    if (action.type === SHOW_FORM) {
        const {weekday, hour, timeSlot} = action;
        const existingTimeSlot = state.selectedTimeSlots.find(selectedTimeSlot =>
            selectedTimeSlot.weekday === weekday &&
            selectedTimeSlot.hour === hour &&
            selectedTimeSlot.timeSlot === timeSlot
        )
        if (existingTimeSlot) {
            const deselectedTimeSlots = state.selectedTimeSlots.filter(selectedTimeSlot =>
                !(selectedTimeSlot.weekday === weekday &&
                selectedTimeSlot.hour === hour &&
                selectedTimeSlot.timeSlot === timeSlot)
            )
            return Object.assign({}, state, {
                selectedTimeSlots: deselectedTimeSlots
            })

        }
        else {
            return Object.assign({}, state, {
                addForm: true,
                selectedTimeSlots: [
                    ...state.selectedTimeSlots,
                    {weekday, hour, timeSlot},
                ]
                
              })
        }
        
    }

    if (action.type === DRAG_CELLS) {
        return Object.assign({}, state, {
            isMouseDown: true,
        })
    }

    if (action.type === FINISH_DRAGGING_CELLS) {
        return Object.assign({}, state, {
            isMouseDown: false,
            hightlighted: ''
        })
    }

    if (action.type === GET_EVENTS_SUCCESS) {
        return Object.assign({}, state, {
            events: action.events
        })
    }

    if (action.type === GET_EVENTS_FAILURE) {
        return Object.assign({}, state, {
            err: action.err
        })
    }

    if (action.type === DELETE_EVENTS_SUCCESS) {
        return Object.assign({}, state, {
           // events: state.events.filter(event => event._id !== action.eventId)
        })
    }

    if (action.type === REQUEST_EVENT_SUCCESS) {
        return Object.assign({}, state, {
            event: action.event
        })
    }

    if (action.type === CHANGE_WEEK) {

        let newDate;

        if(action.back) {
            newDate = moment(state.selectedWeekStartDate).subtract(7, 'days').toDate();
        } else {
            newDate = moment(state.selectedWeekStartDate).add(7, 'days').toDate();
        }
        console.log(newDate, 'newDate')
        console.log(state.selectedWeekStartDate, 'old date')
        return Object.assign({}, state, {
            
            selectedWeekStartDate: newDate 
        })
    }

    return state
}
