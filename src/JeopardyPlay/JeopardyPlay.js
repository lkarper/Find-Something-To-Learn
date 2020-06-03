import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';
import JeopardyQuestion from '../JeopardyQuestion/JeopardyQuestion';
import JeopardyLearn from '../JeopardyLearn/JeopardyLearn';
import Wiki from '../Wiki/Wiki';
import Final from '../Final/Final';
import JeopardyForm from '../JeopardyForm/JeopardyForm';

class JeopardyPlay extends Component {

    static contextType = AppContext;

    render() {

        if (this.context.page === 'question') {
            return <JeopardyQuestion />;
        } else if (this.context.page === 'learn') {
            return <JeopardyLearn />;
        } else if (this.context.page === 'wiki') {
            return <Wiki />;
        } else if (this.context.page === 'final') {
            return <Final />;
        } else {
            return <JeopardyForm />;
        }
    }
}

export default JeopardyPlay;