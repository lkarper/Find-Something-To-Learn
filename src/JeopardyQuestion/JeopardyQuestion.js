import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';

class JeopardyQuestion extends Component {

    static contextType = AppContext;

    state = {
        userReponse: '',
    }

    setUserReponse = (userResponse) => {
        this.setState({
            userResponse,
        });
    }

    handleSubmit = (event, correctAnswer, value) => {
        event.preventDefault();
        console.log(correctAnswer, value)
        const { userResponse } = this.state;
        if (correctAnswer.trim().toLowerCase().indexOf(userResponse.trim().toLowerCase()) !== -1) {
            this.context.checkAnswerAndUpdateScore(true, this.context.currentQuestion, value);
        } else {
            this.context.checkAnswerAndUpdateScore(false, this.context.currentQuestion, value);
        }
    }

    render() {

        const errorHTML = (
            <>
                <h3>Error</h3>
                <p>Sorry, but it looks like something went wrong and the next question could not be loaded.</p>
            </>
        );

        if (this.context.questions.length && Object.keys(this.context).includes('questions')) {
            const questions = this.context.questions;
            const numQuestions = this.context.questions.length;
            const currentId = this.context.currentQuestion;
            const currentScore = Object.keys(this.context.correctAnswersObject)
                .map(key => parseInt(this.context.correctAnswersObject[key]))
                .reduce((acc, curr) => {return acc + curr}, 0);
            const currentQuestion = questions[currentId];

            return (
                <div className="JeopardyQuestion__jContainer">
                    <p><b>Quiz Progress:</b> {currentId + 1}/{numQuestions}</p>
                    <p><b>Current Score:</b> ${currentScore}</p>
                    <p><b>Category:</b> {currentQuestion.category.title}</p>
                    <p><b>Value:</b> {currentQuestion.value}</p>
                    <form className="jeo-q-form" onSubmit={e => this.handleSubmit(e, currentQuestion.answer, currentQuestion.value)}>
                        <fieldset>
                            <legend>{currentQuestion.question}</legend>
                            <label htmlFor="answer-input">What is </label>
                            <input type="text" id="answer-input" onChange={e => this.setUserReponse(e.target.value)} required />
                            <button type="submit">? Submit</button>
                        </fieldset>
                    </form>
                </div>
            );
        }

        return (
            <div className="JeopardyQuestion__jContainer">
                {errorHTML}
            </div>
        );

    }
}

export default JeopardyQuestion;