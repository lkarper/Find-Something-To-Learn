import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import PubStyle from '../PubStyle/PubStyle';
import Jeopardy from '../Jeopardy/Jeopardy';

class Main extends Component {
    render() {
        return (
            <main>
                <Route
                    exact path="/"
                    component={HomePage}
                />
                <Route
                    path="/pubstyle"
                    component={PubStyle}
                />
                <Route 
                    path="/jeopardy"
                    component={Jeopardy}
                />
            </main>
        );
    }
}

export default Main;