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
            this.context.checkAnswerAndUpdateScore(true, this.props.match.params.qId, value);
        } else {
            this.context.checkAnswerAndUpdateScore(false, this.props.match.params.qId, value);
        }
    }

    render() {
        const questions = this.context.questions;
        const numQuestions = this.context.questions.length;
        const currentId = this.props.match.params.qId;
        const currentScore = Object.keys(this.context.correctAnswersObject)
            .map(key => parseInt(this.context.correctAnswersObject[key]))
            .reduce((acc, curr) => {return acc + curr}, 0);
        const currentQuestion = questions[currentId];

        return (
            <div className="JeopardyQuestion__jContainer">
                <p><b>Quiz Progress:</b> {currentId}/{numQuestions}</p>
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
}

export default JeopardyQuestion;