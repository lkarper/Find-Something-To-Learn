import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';
import PubQuestion from '../PubQuestion/PubQuestion';
import PubLearn from '../PubLearn/PubLearn';
import Wiki from '../Wiki/Wiki';
import Final from '../Final/Final';
import PubForm from '../PubForm/PubForm';

class PubPlay extends Component {

    static contextType = AppContext;

    render() {

        if (this.context.page === 'question') {
            return <PubQuestion />;
        } else if (this.context.page === 'learn') {
            return <PubLearn />;
        } else if (this.context.page === 'wiki') {
            return <Wiki />;
        } else if (this.context.page === 'final') {
            return <Final />;
        } else {
            return <PubForm />;
        }
    }
}

export default PubPlay;