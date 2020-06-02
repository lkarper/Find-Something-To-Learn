import React from 'react';
import ReactDOM from 'react-dom';
import PubForm from './PubForm';

describe('PubForm component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PubForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});