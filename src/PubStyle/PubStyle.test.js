import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PubStyle from './PubStyle';

describe('PubStyle component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <PubStyle />
            </BrowserRouter>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });
});