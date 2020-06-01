import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubContext from '../PubContext/PubContext';

class Learn extends Component {

    static contextType = PubContext;

    render() {
        const currentQuestion = decodeURIComponent(this.context.questions[this.context.currentQuestion - 1].question);
        const correctAnswer = decodeURIComponent(this.context.questions[this.context.currentQuestion - 1].correct_answer);

        return (
            <div className="Learn__lContainer">
                {this.context.correct ? "Congrats! You got it right!" : "Sorry, that's not the right answer."}
                <h3>Question: </h3>
                <p>{currentQuestion}</p>
                <h3>Correct answer:</h3>
                <p>{correctAnswer}</p>
                <Link 
                    to={this.context.currentQuestion < this.context.totalQuestions ? `/pubstyle/${this.context.currentQuestion}` : `/pubstyle/${this.context.currentQuestion - 1}/final`}
                >Next Question</Link>
                <Link 
                    to={`/pubstyle/${this.context.currentQuestion}/wiki`}
                >Learn Something with Wikipedia!</Link>                    
            </div>
        );
    }
}

export default Learn;
