import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PubContext from '../PubContext/PubContext';
import PubQuestion from '../PubQuestion/PubQuestion';
import PubForm from '../PubForm/PubForm';
import Learn from '../Learn/Learn';
import Wiki from '../Wiki/Wiki';
import Final from '../Final/Final';

class PubStyle extends Component {

    state = {
        questions: [], 
        currentQuestion: 0,
        totalQuestions: 0,
        currentScore: 0,
        correct: false,
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

    handleNewQuestions = (questions) => {
        this.setState({
            questions,
            totalQuestions: questions.length,
            currentQuestion: 0,
            currentScore: 0,
            correct: false,
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
        const { questions, currentQuestion, totalQuestions, currentScore, correct, learningList } = this.state;
        const contextValue = {
            questions, 
            currentQuestion, 
            totalQuestions, 
            currentScore,
            correct,
            learningList, 
            handleNewQuestions: this.handleNewQuestions,
            updateScoreAndCurrentQuestion: this.updateScoreAndCurrentQuestion,
            addToLearningList: this.addToLearningList,
            removeItemFromLearningList: this.removeItemFromLearningList,
            resetLearningList: this.resetLearningList,
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
                <Route
                    path={'/pubstyle/:qId/wiki'}
                    component={Wiki}
                />
                <Route 
                    path={'/pubstyle/:qId/final'}
                    component={Final}
                />
            </PubContext.Provider>
        );
    }
}

export default PubStyle;