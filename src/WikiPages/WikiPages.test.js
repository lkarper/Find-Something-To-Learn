import React from 'react';
import ReactDOM from 'react-dom';
import WikiPages from './WikiPages';

describe('WikiPages component', () => {
    it ('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<WikiPages />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});