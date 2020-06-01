import React from 'react';

const PubContext = React.createContext({
    questions: [],
    currentQuestion: 0,
    totalQuestions: 0,
    currentScore: 0,
    handleNewQuestion: () => {},
    updateScoreAndCurrentQuestion: () => {},
});

export default PubContext;