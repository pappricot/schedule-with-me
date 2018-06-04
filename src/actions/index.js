export const SCHEDULE_EVENT = 'SCHEDULE_EVENT';
export const scheduleEvent = addEvent => ({
    type: SCHEDULE_EVENT,
    addEvent
})

export const SHOW_FORM = 'SHOW_FORM';
export const showForm = ({weekday, hour, timeSlot}) => ({
    type: SHOW_FORM,
    weekday,
    hour,
    timeSlot
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