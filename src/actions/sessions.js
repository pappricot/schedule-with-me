export const ADD_SESSION = 'ADD_SESSION';
export const addSession = (text, listIndex) => ({
    type: ADD_SESSION,
    text,
    listIndex
});