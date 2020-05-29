import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PubContext from '../PubContext/PubContext';
import PubQuestion from '../PubQuestion/PubQuestion';
import PubForm from '../PubForm/PubForm';
import Learn from '../Learn/Learn';

class PubStyle extends Component {

    state = {
        questions: [], 
        currentQuestion: 0,
        totalQuestions: 0,
        currentScore: 0,
        correct: false,
    }

    handleNewQuestions = (questions) => {
        this.setState({
            questions,
            totalQuestions: questions.length,
        }, () => this.props.history.push(`/pubstyle/${this.state.currentQuestion}`));
    }

    updateScoreAndCurrentQuestion = (score) => {
        this.setState({
            currentScore: this.state.currentScore + score,
            currentQuestion: this.state.currentQuestion + 1,
            correct: score === 1 ? true : false,
        }, () => this.props.history.push(`/pubstyle/${this.state.currentQuestion - 1}/learn`));
    }

    render() {
        const { questions, currentQuestion, totalQuestions, currentScore, correct } = this.state;
        const contextValue = {
            questions, 
            currentQuestion, 
            totalQuestions, 
            currentScore,
            correct, 
            handleNewQuestions: this.handleNewQuestions,
            updateScoreAndCurrentQuestion: this.updateScoreAndCurrentQuestion,
        };

        return (
            <PubContext.Provider value={contextValue}>
                <h2>Pub Style!</h2>
                <Route 
                    exact path={'/pubstyle'}
                    component={PubForm}
                />
                <Route 
                    exact path={'/pubstyle/:qId'}
                    component={PubQuestion}
                />
                <Route 
                    path={'/pubstyle/:qId/learn'}
                    component={Learn}
                />
            </PubContext.Provider>
        );
    }
}

export default PubStyle;