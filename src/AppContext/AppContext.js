import React from 'react';

const AppContext = React.createContext({
    questions: [],
    totalQuestions: 0,
    correctAnswerqIds: [],
    correctAnswersObject: {},
    learningList: {},
    handleNewQuestionsPub: () => {},
    updateScoreAndCurrentQuestion: () => {},
    addToLearningList: () => {},
    removeItemFromLearningList: () => {},
    resetLearningList: () => {},
    handleNewQuestionsJeo: () => {},
    checkAnswerAndUpdateScore: () => {},
});

export default AppContext;