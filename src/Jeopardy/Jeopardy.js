import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import JeopardyForm from '../JeopardyForm/JeopardyForm';
import JeopardyQuestion from '../JeopardyQuestion/JeopardyQuestion';
import JeopardyLearn from '../JeopardyLearn/JeopardyLearn';
import Wiki from '../Wiki/Wiki';
import Final from '../Final/Final';

class Jeopardy extends Component {

    static contextType = AppContext;
    
    state = {
        questions: [],
        totalQuestions: 0,
        correctAnswersObject: {},
        learningList: {},
    }

    addToLearningList = (key, wikiPage) => {
        this.setState({
            learningList: {...this.state.learningList, [key]: wikiPage},
        });
    }
    
    removeItemFromLearningList = (key) => {
        const tempState = {...this.state.learningList};
        delete tempState[key]
        this.setState({
            learningList: {...tempState}
        });
    }

    resetLearningList = () => {
        this.setState({
            learningList: {}
        });
    }

    handleNewQuestionsJeo = (questions) => {
        this.setState({
            questions,
            totalQuestions: questions.length,
            correctAnswersObject: {},
        }, () => this.props.history.push('/jeopardy/0'));
    }

    checkAnswerAndUpdateScore = (correct, qId, value) => {
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

    render() {
        const { questions, totalQuestions, correctAnswersObject, learningList } = this.state;
        const contextValue = {
            questions,
            totalQuestions,
            correctAnswersObject,
            learningList,
            handleNewQuestionsJeo: this.handleNewQuestionsJeo,
            checkAnswerAndUpdateScore: this.checkAnswerAndUpdateScore,
            addToLearningList: this.addToLearningList,
            resetLearningList: this.resetLearningList,
            removeItemFromLearningList: this.removeItemFromLearningList,
        }

        return (
            <AppContext.Provider
                value={contextValue}
            >
                <h2>Jeopardy!</h2>
                <Route
                    exact path={'/jeopardy'}
                    component={JeopardyForm}
                />
                <Route 
                    exact path={'/jeopardy/:qId'}
                    component={JeopardyQuestion}
                />
                <Route 
                    path={'/jeopardy/:qId/learn'}
                    component={JeopardyLearn}
                />
                <Route 
                    path={'/jeopardy/:qId/wiki'}
                    component={Wiki}
                />
                <Route 
                    path={'/jeopardy/:qId/final'}
                    component={Final}
                />
            </AppContext.Provider>
        );
    }
}

export default Jeopardy;