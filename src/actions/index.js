import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import moment from 'moment';

export const SHOW_FORM = 'SHOW_FORM';
export const showForm = ({weekday, hour, timeSlot}) => ({
    type: SHOW_FORM,
    weekday,
    hour,
    timeSlot,
    requested: false
})

export const DRAG_CELLS = 'DRAG_CELLS';
export const dragCells = (isMouseDown, highlighted) => ({
    type: DRAG_CELLS,
    isMouseDown,
    highlighted
})

export const FINISH_DRAGGING_CELLS = 'FINISH_DRAGGING_CELLS';
export const finishDraggingCells = (isMouseDown, highlighted) => ({
    type: FINISH_DRAGGING_CELLS,
    isMouseDown,
    highlighted
})

export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const getEventsSuccess = (events) => ({
    type: GET_EVENTS_SUCCESS,
    events
})

export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';
export const getEventsFailure = (err) => ({
    type: GET_EVENTS_FAILURE,
    err
})

export const DELETE_EVENTS_SUCCESS = 'DELETE_EVENTS_SUCCESS';
export const deleteEventsSuccess = (eventId) => ({
    type: DELETE_EVENTS_SUCCESS,
    eventId
})

export const REQUEST_EVENT_SUCCESS = 'REQUEST_EVENT_SUCCESS';
export const requestEventSuccess = (event) => ({
    type: REQUEST_EVENT_SUCCESS,
    event
})

export const CANCEL_EVENT_SUCCESS = 'CANCEL_EVENT_SUCCESS';
export const cancelEventSuccess = (event) => ({
    type: CANCEL_EVENT_SUCCESS,
    event
})

export const CHANGE_WEEK = 'CHANGE_WEEK';
export const changeWeek = ({back, forward}) => ({
    type: CHANGE_WEEK,
    back,
    forward
})

//thunk
export const getEvents = () => (dispatch, getState) => {
    console.log('in getEvents')
   const authToken = getState().auth.authToken; 
   const weekStartDate = moment(getState().main.selectedWeekStartDate).format('YYYY-MM-DD HH:mm:ss');
   console.log(weekStartDate, 'weekStartDate');
    return fetch(`${API_BASE_URL}/events?weekStartDate=${weekStartDate}`, {
        method: 'GET',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(events => dispatch(getEventsSuccess(events)))
    .catch(err => dispatch(getEventsFailure('There was an error.')))
}

export const scheduleEvent = (addEvent) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    addEvent.weekStartDate = moment(getState().main.selectedWeekStartDate).format('YYYY-MM-DD HH:mm:ss');
    console.log(addEvent.weekStartDate, 'weekStartDate');
    fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        //need headers if express.json is used
        headers: new Headers({'content-type': 'application/json', Authorization: `Bearer ${authToken}`}),
        body: JSON.stringify(addEvent)
    })
    .then(res => normalizeResponseErrors(res))
    //.then(() => getEvents()(dispatch, getState))
    .then(() => dispatch(getEvents())) //goes through thunk middleware
}

export const deleteEvents = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(deleteEventsSuccess(id)))
    .then(() => dispatch(getEvents()))
}

export const requestEvent = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log('id in requestevebnt',id);
    return fetch(`${API_BASE_URL}/events/${id}/join`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${authToken}`
        },
    })
    .then(res => normalizeResponseErrors(res))
    .then(eventId => dispatch(requestEventSuccess(eventId)))
    .then(() => dispatch(getEvents()))
}
//unjoin
export const cancelEvent = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/${id}/unjoin`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(eventId => dispatch(cancelEventSuccess(eventId)))
    .then(() => dispatch(getEvents()))
}

export const changeWeekThunk = (param) => (dispatch) => {
    dispatch(changeWeek(param));
    dispatch(getEvents())
}

