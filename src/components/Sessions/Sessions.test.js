import React from 'react';
import {shallow, mount} from 'enzyme';

import Sessions from './Sessions';
import Session from './Session';

describe('<Sessions />', () => {

    let seedSessions = [];
    beforeAll(() => {
        for (let i = 0; i < 5; i++) {
            seedSessions.push({
                name: ['Anya', 'Banya', 'Canya', 'Anya', 'Banya', 'Canya'],
                where: ['GH', 'GH', 'GH','GH','GH','GH'],
                when: ['12pm', '1pm','2pm','3pm','4pm','5pm', ]
            });
        }
    });

    it('renders without crashing', () => {
        shallow(<Sessions />);
    })

    it('renders sessions', () => {
        const wrapper = shallow(
            <Sessions sessions={seedSessions} selectedWeekStartDate={new Date()} />
        )
        const sessions = wrapper.find(Session);
        expect(sessions.length).toEqual(seedSessions.length);
        const firstSession = sessions.first();
        expect(firstSession.prop('name')).toEqual(seedSessions[0].name);
    })
});