import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';

class PubLearn extends Component {

    static contextType = AppContext;

    render() {

        const currentId = this.props.match.params.qId;
        const currentQuestion = decodeURIComponent(this.context.questions[currentId].question);
        const correctAnswer = decodeURIComponent(this.context.questions[currentId].correct_answer);

        return (
            <div className="Learn__lContainer">
                {this.props.location.state.score ? "Congrats! You got it right!" : "Sorry, that's not the right answer."}
                <h3>Question: </h3>
                <p>{currentQuestion}</p>
                <h3>Correct answer:</h3>
                <p>{correctAnswer}</p>
                <Link 
                    to={parseInt(currentId) + 1 === this.context.totalQuestions ? `/pubstyle/${currentId}/final` : `/pubstyle/${(parseInt(currentId)+1)}`}
                >Next Question</Link>
                <Link 
                    to={`/pubstyle/${currentId}/wiki`}
                >Learn Something with Wikipedia!</Link>                    
            </div>
        );
    }
}

export default PubLearn;
