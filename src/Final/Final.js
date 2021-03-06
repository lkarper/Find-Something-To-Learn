import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../AppContext/AppContext';

class Final extends Component {

    static contextType = AppContext;
    
    static defaultProps = {
        match: {
            path: '',
        },
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // scrolls to top of page when component mounts
    }

    render() {

        if (!Object.keys(this.context).includes('learningList')) {
            return (
                <div className="Final__fcontainer">
                    <h2>Error</h2>
                    <p>Sorry, but something went wrong and the score and learning list could not be loaded.</p>
                </div>
            );
        }

        const { learningList, removeItemFromLearningList, resetLearningList } = this.context;

        const learningHTML = Object.keys(learningList).map((key, i) => {
            return (
                <li key={i}>
                    <h3><b>{learningList[key].title}</b></h3>
                    <p>{learningList[key].extract}</p>
                    <a href={`https://en.wikipedia.org/wiki/${learningList[key].title.split(" ").join("_")}`} target="_blank" rel="noopener noreferrer">Learn more on Wikipedia!</a>
                    <button type="button" onClick={() => removeItemFromLearningList(key)}>Remove this item</button>
                </li>
            );
        });

        let scoreHTML = null;
        const { gameType } = this.context;

        if (gameType === 'pubstyle') {
            scoreHTML = <p>You got {this.context.correctAnswerqIds.length}/{this.context.totalQuestions}</p>;
        } else {
            const currentScore = Object.keys(this.context.correctAnswersObject)
                .map(key => parseInt(this.context.correctAnswersObject[key]))
                .reduce((acc, curr) => {return acc + curr}, 0);
            scoreHTML = <p>You won ${currentScore}</p>;
        }

        return (
            <div className="Final__fcontainer">
                <h2>Final Score:</h2>
                {scoreHTML}
                <h2>Your Learning List!</h2>
                <ol>
                    {learningHTML.length > 0 ? learningHTML : <li>Looks like your Learning List is empty at this time.</li>}
                </ol>
                    {learningHTML.length > 0 ? <button onClick={() => resetLearningList()}>Click here to delete your learning list!</button> : ''}
                <button type="button" onClick={() => this.context.startNewGame()}>Play Again</button>
                <Link 
                    to={'/'}
                >
                    Back to homepage
                </Link>
            </div>
        );
    }
}

Final.propTypes = {
    match: PropTypes.object.isRequired,
}

export default Final;