import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Final from './Final';

describe('Final component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Final />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});