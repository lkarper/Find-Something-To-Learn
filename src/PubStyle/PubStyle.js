import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import PubQuestion from '../PubQuestion/PubQuestion';
import PubForm from '../PubForm/PubForm';
import PubLearn from '../PubLearn/PubLearn';
import Wiki from '../Wiki/Wiki';
import Final from '../Final/Final';

class PubStyle extends Component {

    state = {
        questions: [], 
        totalQuestions: 0,
        correctAnswerqIds: [],
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

    handleNewQuestionsPub = (questions) => {
        this.setState({
            questions,
            totalQuestions: questions.length,
            correctAnswerqIds: [],
        }, () => this.props.history.push(`/pubstyle/0`));
    }

    updateScoreAndCurrentQuestion = (correct, qId) => {
        this.setState({
            correctAnswerqIds: !this.state.correctAnswerqIds.includes(qId) && correct ? [...this.state.correctAnswerqIds, qId] : [...this.state.correctAnswerqIds],
        }, () => this.props.history.push({
                pathname: `/pubstyle/${qId}/learn`,
                state: { correct },
            })
        );
    }

    render() {
        const { questions, totalQuestions, correctAnswerqIds, learningList } = this.state;
        const contextValue = {
            questions, 
            totalQuestions, 
            correctAnswerqIds,
            learningList, 
            handleNewQuestionsPub: this.handleNewQuestionsPub,
            updateScoreAndCurrentQuestion: this.updateScoreAndCurrentQuestion,
            addToLearningList: this.addToLearningList,
            removeItemFromLearningList: this.removeItemFromLearningList,
            resetLearningList: this.resetLearningList,
        };

        return (
            <AppContext.Provider value={contextValue}>
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
                    component={PubLearn}
                />
                <Route
                    path={'/pubstyle/:qId/wiki'}
                    component={Wiki}
                />
                <Route 
                    path={'/pubstyle/:qId/final'}
                    component={Final}
                />
            </AppContext.Provider>
        );
    }
}

export default PubStyle;