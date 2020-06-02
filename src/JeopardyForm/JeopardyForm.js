import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';

class JeopardyForm extends Component {

    static contextType = AppContext;

    state = {
        numberQuestions: 10,
    };

    setNumberQuestions = (numberQuestions) => {
        this.setState({
            numberQuestions
        });
    }

    fetchJeoTrivia = (event) => {
        event.preventDefault();
        const url = `http://jservice.io/api/random?count=${this.state.numberQuestions}`;
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
            .catch(error => console.log('error', error));
    }

    render() {
        return (
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
        );
    }
}

export default JeopardyForm;