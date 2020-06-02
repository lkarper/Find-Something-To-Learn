import React, { Component } from 'react';
import PubContext from '../PubContext/PubContext';
class PubQuestion extends Component {

    static contextType = PubContext;

    state = {
        userGuess: '',
        shuffledChoices: [],
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.userGuess === this.context.questions[this.props.match.params.qId].correct_answer) {
            this.context.updateScoreAndCurrentQuestion(1, this.props.match.params.qId);
        } else {
            this.context.updateScoreAndCurrentQuestion(0, this.props.match.params.qId);
        }
    }

    handleChoiceChange = (userGuess) => {
        this.setState({
            userGuess,
        });
    }

    componentDidMount() {
        const currentQuestionIndex = this.props.match.params.qId;
        const questionObject = this.context.questions[currentQuestionIndex];
        if (questionObject.type === 'multiple') {
            const { correct_answer, incorrect_answers } = questionObject;
            const choices = [...incorrect_answers, correct_answer];
            const shuffledChoices = [];
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * choices.length);
                shuffledChoices.push(choices[randomIndex]);
                choices.splice(randomIndex, 1);
            };

            this.setState({
                shuffledChoices,
            });
        }
    }

    render() { 
        const { totalQuestions, currentScore } = this.context;
        const currentQuestionIndex = this.props.match.params.qId;
        const { category, correct_answer, difficulty, incorrect_answers, question, type } = this.context.questions[currentQuestionIndex];
        let choicesHTML;
        if (type === 'multiple') {
            choicesHTML = this.state.shuffledChoices.map((choice, i) => 
                <div key={i}>
                    <input id={i} type="radio" name="choice" value={choice} onChange={e => this.handleChoiceChange(e.target.value)}/>
                    <label htmlFor={i}>{decodeURIComponent(choice)}</label>
                </div>
                );
        } else {
            choicesHTML = (
                <>
                    <div>
                        <input id="true" type="radio" name="choice" value="True" onChange={e => this.handleChoiceChange(e.target.value)}/>
                        <label htmlFor="true">True</label>
                    </div>
                    <div>
                        <input id="false" type="radio" name="choice" value="False" onChange={e => this.handleChoiceChange(e.target.value)}/>
                        <label htmlFor="false">False</label>
                    </div>
                </>
            );
        }
        return (
            <div className="PubQuestion__qcontainer">
                <p>Question {parseInt(currentQuestionIndex) + 1} of {totalQuestions}</p>
                <p>Score: {currentScore}/{totalQuestions}</p>
                <p>Category: {decodeURIComponent(category)}</p>
                <p>Type: {decodeURIComponent(type)}</p>
                <p>Difficulty: {decodeURIComponent(difficulty)}</p>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <fieldset>
                        <legend>{decodeURIComponent(question)}</legend>
                        {choicesHTML}
                    </fieldset>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default PubQuestion;