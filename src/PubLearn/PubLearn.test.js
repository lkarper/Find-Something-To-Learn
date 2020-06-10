import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PubLearn from './PubLearn';

describe('PubLearn component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <PubLearn />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});