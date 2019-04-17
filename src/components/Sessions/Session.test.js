import React from 'react';
import {shallow, mount} from 'enzyme';

import Session from './Session';

describe('<Session />', () => {
    it('renders without crashing', () => {
        shallow(<Session />);
    })
})

describe('<Session />', () => {
    it('renders correct props', () => {
        const name = "Anya";
        const where = "Google Hangout"
        const wrapper = shallow(<Session name={name}  where={where}/>);
        expect(wrapper.contains(<p>{name} at {where}</p>)).toEqual(true);
    })
})