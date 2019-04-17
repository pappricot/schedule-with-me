import { ADD_SESSIONS } from '../actions/sessions';

const initialState = {
    sessions: []
}

export default (state=initialState, action) => {
    if (action.type === ADD_SESSIONS) {
        return Object.assign({}, state, {
            sessions: [...state.lists]
        })
    }
}