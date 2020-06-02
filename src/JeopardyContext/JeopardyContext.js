import React from 'react';

const JeopardyContext = React.createContext({
    questions: [],
    totalQuestions: 0,
    correctAnswersObject: {},
    handleNewQuestions: () => {},
    checkAnswerAndUpdateScore: () => {},

});

export default JeopardyContext;