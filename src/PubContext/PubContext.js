import React from 'react';

const PubContext = React.createContext({
    questions: [],
    totalQuestions: 0,
    correctAnswerqIds: [],
    learningList: {},
    handleNewQuestion: () => {},
    updateScoreAndCurrentQuestion: () => {},
    addToLearningList: () => {},
    removeItemFromLearningList: () => {},
    resetLearningList: () => {},
});

export default PubContext;