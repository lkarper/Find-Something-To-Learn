import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';
import JeopardyPlay from '../JeopardyPlay/JeopardyPlay';

class Jeopardy extends Component {
    
    state = {
        questions: [], 
        totalQuestions: 0,
        currentQuestion: 0,
        page: '',
        correct: false,
        correctAnswersObject: {},
        learningList: {},
        gameType: 'jeopardy',
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
            currentQuestion: 0,
            page: 'question',
            correctAnswersObject: {},
        });
    }

    checkAnswerAndUpdateScore = (correct, qId, value) => {
        this.setState({
            correctAnswersObject: correct && !Object.keys(this.state.correctAnswersObject).includes(qId) ? 
                {...this.state.correctAnswersObject, [qId]: parseInt(value) || 0} :
                {...this.state.correctAnswersObject},
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
            correctAnswersObject: {},
        });
    }

    render() {
        const { questions, totalQuestions, currentQuestion, page, correct, correctAnswersObject, learningList, gameType } = this.state;
        const contextValue = {
            questions, 
            totalQuestions,
            currentQuestion,
            page, 
            correct,
            learningList, 
            gameType,
            correctAnswersObject,
            handleNewQuestionsJeo: this.handleNewQuestionsJeo,
            checkAnswerAndUpdateScore: this.checkAnswerAndUpdateScore,
            goToNextQuestion: this.goToNextQuestion,
            goToWiki: this.goToWiki,
            addToLearningList: this.addToLearningList,
            removeItemFromLearningList: this.removeItemFromLearningList,
            resetLearningList: this.resetLearningList,
            startNewGame: this.startNewGame,
        }

        return (
            <AppContext.Provider value={contextValue}>
                <h2>Jeopardy!</h2>
                <JeopardyPlay />
            </AppContext.Provider>
        );
    }
}

export default Jeopardy;