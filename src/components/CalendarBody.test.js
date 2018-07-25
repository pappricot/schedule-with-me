import React from 'react';
import {shallow, mount} from 'enzyme';
import {CalendarBody} from './CalendarBody';
//import configureStore from 'redux-mock-store';
 
// // create any initial state needed
// const initialState = {}; 
// // here it is possible to pass in any middleware if needed into //configureStore
// const mockStore = configureStore();
// let wrapper;
// let store;



describe('<CalendarBody />', () => {
//     let wrapper;
//   //mock function to replace the one provided by mapDispatchToProps
//   const selectedWeekStartDate = jest.fn();
 
//    beforeEach(() => {
//      // pass the mock function as the prop 
//      wrapper = shallow(<CalendarBody store={store}/>)
//    })

//    it('renders without crashing', () => {
//     wrapper
//     })

    it('should render without crashing', () => {
        let seedLists = [];
        beforeAll(() => {
            for (let i = 0; i < 6; i++) {
                seedLists.push({
                    weekdays: ['Monday', 'Tuesday', 'Wedndesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    hoursOfDay: [1,2,3,4,5,6,7],
                    timeSlots:[1,2]
                });
            }
        });

        shallow(<CalendarBody />)
    })
})