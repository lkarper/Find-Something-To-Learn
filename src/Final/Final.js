import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';

class Final extends Component {

    static contextType = AppContext; 

    render() {
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
        })

        return (
            <div className="Final__fcontainer">
                <h2>Final Score:</h2>
                <p>You got {this.context.correctAnswerqIds.length}/{this.context.totalQuestions}</p>
                <h2>Your Learning List!</h2>
                <ol>
                    {learningHTML.length > 0 ? learningHTML : <li>Looks like your Learning List is empty at this time.</li>}
                </ol>
                    {learningHTML.length > 0 ? <button onClick={() => resetLearningList()}>Click here to delete your learning list!</button> : ''}
                <Link 
                    to={'/pubstyle'}
                >Play Again</Link>
            </div>
        );

    }
}

export default Final;