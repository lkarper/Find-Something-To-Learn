import React from 'react';

const AppContext = React.createContext({
    questions: [],
    totalQuestions: 0,
    currentQuestion: 0,
    page:'',
    correct: false,
    correctAnswerqIds: [],
    correctAnswersObject: {},
    learningList: {},
    gameType: '',
    handleNewQuestionsPub: () => {},
    updateScoreAndCurrentQuestion: () => {},
    goToNextQuestion: () => {},
    goToWiki: () => {},
    addToLearningList: () => {},
    removeItemFromLearningList: () => {},
    resetLearningList: () => {},
    handleNewQuestionsJeo: () => {},
    checkAnswerAndUpdateScore: () => {},
    startNewGame: () => {},
});

export default AppContext;