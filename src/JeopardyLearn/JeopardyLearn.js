import React, { Component } from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';

class JeopardyLearn extends Component {

    static defaultProps = {
        match: { 
            params: {
                qId: '',
            },
        },
        location: {
            state: {
                correct: false,
            },
        },
    }

    static contextType = AppContext;
    
    render() {

        const errorHTML = (
            <>
                <h3>Error</h3>
                <p>Sorry, looks like something went wrong and the question and answer could not load.</p>
            </>
        )

        if (this.props.match.params.qId && Object.keys(this.context).includes('questions')) {
            const currentId = this.props.match.params.qId;
            const currentQuestion = this.context.questions[currentId].question;
            const correctAnswer = this.context.questions[currentId].answer;

            return (
                <div className="JeopardyLearn__jContainer">
                    {this.props.location.state.correct ? "Congrats! You got it right!" : "Sorry, that's not the right answer."}
                    <h3>Question: </h3>
                    <p>{currentQuestion}</p>
                    <h3>Correct answer:</h3>
                    <p>{parse(correctAnswer)}</p>
                    <Link 
                        to={parseInt(currentId) + 1 === this.context.totalQuestions ? `/jeopardy/${currentId}/final` : `/jeopardy/${(parseInt(currentId)+1)}`}
                    >Next Question</Link>
                    <Link 
                        to={`/jeopardy/${currentId}/wiki`}
                    >Learn Something with Wikipedia!</Link>                    
                </div>
            );
        }

        return (
            <div className="JeopardyLearn__jContainer">
                {errorHTML}
            </div>
        );
    }
}

export default JeopardyLearn;