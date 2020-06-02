import React from 'react';
import ReactDOM from 'react-dom';
import PubQuestion from './PubQuestion';

describe('PubQuestion component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PubQuestion />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});