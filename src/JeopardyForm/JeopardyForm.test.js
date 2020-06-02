import React from 'react';
import ReactDOM from 'react-dom';
import JeopardyForm from './JeopardyForm';

describe('JeopardyForm component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<JeopardyForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});