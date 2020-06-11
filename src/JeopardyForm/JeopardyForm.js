import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';

class JeopardyForm extends Component {

    static contextType = AppContext;

    state = {
        numberQuestions: 10,
        error: null,
    };

    setNumberQuestions = (numberQuestions) => {
        this.setState({
            numberQuestions
        });
    }

    fetchJeoTrivia = (event) => {
        event.preventDefault();
        const url = `https://jservice.io/api/random?count=${this.state.numberQuestions}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                    throw new Error(response.statusText);
                }
            })
            .then(responseJson => {
                console.log(responseJson);
                this.context.handleNewQuestionsJeo(responseJson);
            })
            .catch(error => {
                console.log('error', error);
                this.setState({
                    error: error.message,
                });
            });
    }

    render() {

        const errorHTML = (
            <div className="JeopardyForm__errorContainer">
                <h3>Error</h3>
                <p>Looks like something went wrong while fetching questions: {this.state.error}.</p>
                <p>Check your connection and try again.</p>
            </div>
        );

        return (
            <div>
                <form onSubmit={e => this.fetchJeoTrivia(e)}>
                    <label htmlFor="num-qs2">How many questions would you like?</label>
                    <input 
                        id="num-qs2" 
                        type="number" 
                        min="5" 
                        max="100" 
                        value={this.state.numberQuestions}
                        required
                        onChange={e => this.setNumberQuestions(e.target.value)}
                        />
                    <button type="submit">Let's Play Jeopardy!</button>
                </form>
                {this.state.error ? errorHTML : ''}
            </div>
        );
    }
}

export default JeopardyForm;