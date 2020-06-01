import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubContext from '../PubContext/PubContext';

class Final extends Component {

    static contextType = PubContext;

    render() {
        return (
            <div className="Final__fcontainer">
                <h2>Final Score:</h2>
                <p>You got {this.context.currentScore}/{this.context.totalQuestions}</p>
                <Link 
                    to={'/pubstyle'}
                >Play Again</Link>
            </div>
        );

    }
}

export default Final;