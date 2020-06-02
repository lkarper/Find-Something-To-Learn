import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Wiki from './Wiki';

describe('Wiki component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Wiki />
            </BrowserRouter>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });
});