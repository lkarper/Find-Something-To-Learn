import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubContext from '../PubContext/PubContext';

class Learn extends Component {

    static contextType = PubContext;

    render() {

        const currentId = this.props.match.params.qId;
        const currentQuestion = decodeURIComponent(this.context.questions[currentId].question);
        const correctAnswer = decodeURIComponent(this.context.questions[currentId].correct_answer);

        return (
            <div className="Learn__lContainer">
                {this.context.correct ? "Congrats! You got it right!" : "Sorry, that's not the right answer."}
                <h3>Question: </h3>
                <p>{currentQuestion}</p>
                <h3>Correct answer:</h3>
                <p>{correctAnswer}</p>
                <Link 
                    to={currentId < this.context.totalQuestions ? `/pubstyle/${(parseInt(currentId)+1)}` : `/pubstyle/${currentId}/final`}
                >Next Question</Link>
                <Link 
                    to={`/pubstyle/${currentId}/wiki`}
                >Learn Something with Wikipedia!</Link>                    
            </div>
        );
    }
}

export default Learn;
