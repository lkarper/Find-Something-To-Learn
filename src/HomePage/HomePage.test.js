import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HomePage from './HomePage';

describe('HomePage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = shallow(<HomePage />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});