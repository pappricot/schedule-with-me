import {SHOW_FORM, showForm, DRAG_CELLS, dragCells, deleteEvents, DELETE_EVENTS_SUCCESS, deleteEventsSuccess, getEventsSuccess} from './index';

describe('showForm', () => {
    it('Should return the action', () => {
        const weekday = "Monday";
        const hour = "12pm";
        const timeSlot = "Monday 12pm";
        const action = showForm({weekday, hour, timeSlot});
        expect(action.type).toEqual(SHOW_FORM);
        expect(action.weekday).toEqual(weekday);
        expect(action.hour).toEqual(hour);
        expect(action.timeSlot).toEqual(timeSlot);
    });
});

describe('dragCells', () => {
    it('Should return the action', () => {
        const isMouseDown = false;
        const highlighted = false;
        const action = dragCells(isMouseDown, highlighted);
        expect(action.type).toEqual(DRAG_CELLS);
        expect(action.isMouseDown).toEqual(isMouseDown);
        expect(action.highlighted).toEqual(highlighted);
    });
});

describe ('dispatch an event', () => {
    it('should dispatch an event', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
        const dispatch = jest.fn(); // make it a function

        const getState = jest.fn();
        getState.mockReturnValue({
            auth: {
                authToken: 'abcde',
            }
        });
        
        return deleteEvents(100)(dispatch, getState)
        .then(() => {
            expect(dispatch).toBeCalledWith(deleteEventsSuccess(100));
            expect(getState).toBeCalled();
        });
        
    })
})
