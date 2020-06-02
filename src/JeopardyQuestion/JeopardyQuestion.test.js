import React from 'react';
import ReactDOM from 'react-dom';
import JeopardyQuestion from './JeopardyQuestion';

describe('Jeopardy component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<JeopardyQuestion />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});