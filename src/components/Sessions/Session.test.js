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
        const where = "Google Hangout";
        const when = "12pm"
        const wrapper = shallow(<Session name={name}  where={where} when={when}/>);
        expect(wrapper.contains(<h3>{name} {where}</h3>)).toEqual(true);
        expect(wrapper.contains(<p>{when}</p>)).toEqual(true);
    })
})