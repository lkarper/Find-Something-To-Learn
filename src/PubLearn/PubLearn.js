import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';

class PubLearn extends Component {

    static contextType = AppContext;

    render() {

        const errorHTML = (
            <>
                <h3>Error</h3>
                <p>Sorry, looks like something went wrong and the question and answer could not load.</p>
            </>
        );

        if (Object.keys(this.context).length && Object.keys(this.context).includes('questions')) {
            const currentId = this.context.currentQuestion - 1;
            const currentQuestion = decodeURIComponent(this.context.questions[currentId].question);
            const correctAnswer = decodeURIComponent(this.context.questions[currentId].correct_answer);

            return (
                <div className="Learn__lContainer">
                    {this.context.correct ? <p>"Congrats! You got it right!"</p> : <p>"Sorry, that's not the right answer."</p>}
                    <h3>Question: </h3>
                    <p>{currentQuestion}</p>
                    <h3>Correct answer:</h3>
                    <p>{correctAnswer}</p>
                    <button type="button" onClick={() => this.context.goToNextQuestion()}>Next Question</button>
                    <button type="button" onClick={() => this.context.goToWiki()}>Learn Something with Wikipedia!</button>                    
                </div>
            );
        }

        return (
            <div className="Learn__lContainer">
                {errorHTML}
            </div>
        );
    }
}

export default PubLearn;
