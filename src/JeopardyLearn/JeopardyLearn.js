import React, { Component } from 'react';
import parse from 'html-react-parser';
import AppContext from '../AppContext/AppContext';

class JeopardyLearn extends Component {

    static contextType = AppContext;
    
    render() {

        const errorHTML = (
            <>
                <h3>Error</h3>
                <p>Sorry, looks like something went wrong and the question and answer could not load.</p>
            </>
        );

        if (this.context.length && Object.keys(this.context).includes('questions')) {
            const {currentQuestion, questions, correct, goToNextQuestion, goToWiki } = this.context;
            const currentQ = questions[currentQuestion - 1].question;
            const correctAnswer = questions[currentQuestion - 1].answer.replace('\\', '');

            return (
                <div className="JeopardyLearn__jContainer">
                    {correct ? "Congrats! You got it right!" : "Sorry, that's not the right answer."}
                    <h3>Question: </h3>
                    <p>{currentQ}</p>
                    <h3>Correct answer:</h3>
                    <p>{parse(correctAnswer)}</p>
                    <button type="button" onClick={() => goToNextQuestion()}>Next Question</button>
                    <button type="button" onClick={() => goToWiki()}>Learn Something with Wikipedia!</button>                 
                </div>
            );
        }

        return (
            <div className="JeopardyLearn__jContainer">
                {errorHTML}
            </div>
        );
    }
}

export default JeopardyLearn;