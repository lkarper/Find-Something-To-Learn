import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubContext from '../PubContext/PubContext';

class Learn extends Component {

    static contextType = PubContext;

    render() {
        return (
            <div className="Learn__lContainer">
                {this.context.correct ? "Congrats! You got it right!" : "Sorry, that's not the right answer."}
                <Link 
                    to={`/pubstyle/${this.context.currentQuestion}`}
                >Next Question</Link>
                <Link 
                    to={`/pubstyle/${this.context.currentQuestion}/wiki`}
                >Learn Something with Wikipedia!</Link>                    
            </div>
        );
    }
}

export default Learn;
