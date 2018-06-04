import {SCHEDULE_EVENT, SHOW_FORM, DRAG_CELLS, FINISH_DRAGGING_CELLS} from '../actions';

const initialState = {
    addForm: false,
    selectedWeekday: null,
    selectedHour: null,
    selectedTimeSlot: null,
    events: {},
    isMouseDown: false,
    highlighted: 'highlighted',
    selectedTimeSlots: []
}

export default (state=initialState, action) => {
    if (action.type === SCHEDULE_EVENT) {
        const events = Object.assign({}, state.events);
        for (let i=0; i < state.selectedTimeSlots.length; i++ ) {
            const timeSlotObj = state.selectedTimeSlots[i]
            const {weekday, hour, timeSlot} = timeSlotObj;
        
         //create new event and copy it to the empty object (line 27: that's why we don't use action.events)

        events[weekday] = events[weekday] || {};
        events[weekday][hour] = events[weekday][hour] || {};
        events[weekday][hour][timeSlot] = action.addEvent;
        }
console.log(events)
        return Object.assign({}, state, {
            selectedTimeSlots: [], // remove slots once submitted
            events: events
        })
    }

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

    return state
}
