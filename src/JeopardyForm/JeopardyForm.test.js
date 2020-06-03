import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import JeopardyForm from './JeopardyForm';

describe('JeopardyForm component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<JeopardyForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = shallow(<JeopardyForm />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});