import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import JeopardyLearn from './JeopardyLearn';

describe('JeopardyLearn component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <JeopardyLearn />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});