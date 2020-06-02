import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import JeopardyContext from '../JeopardyContext/JeopardyContext';
import JeopardyForm from '../JeopardyForm/JeopardyForm';
import JeopardyQuestion from '../JeopardyQuestion/JeopardyQuestion';

class Jeopardy extends Component {

    static contextType = JeopardyContext;
    
    state = {
        questions: [],
        totalQuestions: 0,
        correctAnswersObject: {},
    }

    handleNewQuestions = (questions) => {
        this.setState({
            questions,
            totalQuestions: questions.length,
        }, () => this.props.history.push('/jeopardy/0'));
    }

    checkAnswerAndUpdateScore = (correct, qId, value) => {
        if (correct && !Object.keys(this.state.correctAnswersObject).includes(qId)) {
            this.setState({
                correctAnswersObject: correct && !Object.keys(this.state.correctAnswersObject).includes(qId) ? 
                    {...this.state.correctAnswersObject, [qId]: parseInt(value)} :
                    {...this.state.correctAnswersObject}, 
            }, () => this.props.history.push({
                    pathname: `/jeopardy/${qId}/learn`,
                    state: { correct },
                })
            );
        }
    }

    render() {
        const { questions, totalQuestions, correctAnswersObject } = this.state;
        const contextValue = {
            questions,
            totalQuestions,
            correctAnswersObject,
            handleNewQuestions: this.handleNewQuestions,
            checkAnswerAndUpdateScore: this.checkAnswerAndUpdateScore,
        }

        return (
            <JeopardyContext.Provider
                value={contextValue}
            >
                <h2>Jeopardy!</h2>
                <Route
                    exact path={'/jeopardy'}
                    component={JeopardyForm}
                />
                <Route 
                    path={'/jeopardy:qId'}
                    component={JeopardyQuestion}
                />
            </JeopardyContext.Provider>
        );
    }
}

export default Jeopardy;