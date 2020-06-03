import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';
import PubPlay from '../PubPlay/PubPlay';

class PubStyle extends Component {

    state = {
        questions: [], 
        totalQuestions: 0,
        currentQuestion: 0,
        page: '',
        correct: false,
        correctAnswerqIds: [],
        learningList: {},
        gameType: 'pubstyle',
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
            currentQuestion: 0,
            page: 'question',
            correctAnswerqIds: [],
        });
    }

    updateScoreAndCurrentQuestion = (correct, qId) => {
        this.setState({
            correctAnswerqIds: !this.state.correctAnswerqIds.includes(qId) && correct ? [...this.state.correctAnswerqIds, qId] : [...this.state.correctAnswerqIds],
            page: 'learn',
            correct,
            currentQuestion: this.state.currentQuestion + 1,
        });
    }

    goToNextQuestion = () => {
        this.setState({
            page: this.state.currentQuestion === this.state.totalQuestions ? 'final' : 'question',
        });
    }

    goToWiki = () => {
        this.setState({
            page: 'wiki',
        });
    }

    startNewGame = () => {
        this.setState({
            questions: [], 
            totalQuestions: 0,
            currentQuestion: 0,
            page: '',
            correct: false,
            correctAnswerqIds: [],
        });
    }

    render() {
        const { questions, totalQuestions, currentQuestion, page, correct, correctAnswerqIds, learningList, gameType } = this.state;
        const contextValue = {
            questions, 
            totalQuestions,
            currentQuestion,
            page, 
            correct,
            correctAnswerqIds,
            learningList, 
            gameType,
            handleNewQuestionsPub: this.handleNewQuestionsPub,
            updateScoreAndCurrentQuestion: this.updateScoreAndCurrentQuestion,
            goToNextQuestion: this.goToNextQuestion,
            goToWiki: this.goToWiki,
            addToLearningList: this.addToLearningList,
            removeItemFromLearningList: this.removeItemFromLearningList,
            resetLearningList: this.resetLearningList,
            startNewGame: this.startNewGame,
        };

        return (
            <AppContext.Provider value={contextValue}>
                <h2>Pub Style!</h2>
                <PubPlay />
            </AppContext.Provider>
        );
    }
}

export default PubStyle;