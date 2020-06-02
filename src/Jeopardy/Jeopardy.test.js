import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Jeopardy from './Jeopardy';

describe('Jeopardy component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Jeopardy />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});