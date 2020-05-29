import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage__description">
                <h2>
                    Welcome to 'Find Something to Learn'!
                </h2>
                <p>
                    FStL is a trivia app the helps you find what you don't know!  
                    By attempting to answer trvia questions, you can figure out what you need to learn more about!
                    There are two ways to play: Pub Triva Style and Jeopardy! Style.
                    Pub Trivia Style allows you to answer multiple-choice or True/False questions (or a mix of the two)
                    in a category of your choice or a random mix of all the categories!
                    Jeopardy! Style allows you to answer questions that have appeared on real episodes of the hit television
                    show "Jeopardy!".  This mode is more challenging because there are no options to pick from when answering a question! 
                </p>
                <p>
                    Whichever style you choose, while answering questions, you will have the option to click a button to instantly search
                    Wikipedia for information related to the question that you've just attempted to answer!  In this way, you can easily...
                    <b>Find Something to Learn!</b>
                </p>
                <div className="HomePage__quiz-options">
                    <Link
                        to={"/pubstyle"}
                    >
                        Play Pub Style!
                    </Link>
                    <Link
                        to={"/jeopardy"}
                    >
                        Play Jeopardy! Style!
                    </Link>
                </div>
            </div>
        );    
    }
}

export default HomePage;