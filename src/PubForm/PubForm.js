import React, { Component } from 'react';
import AppContext from '../AppContext/AppContext';
import PubCategories from '../PubCategories';

class PubForm extends Component {

    static contextType = AppContext;

    state = {
        numQuestions : 10,
        category: 0,
        difficulty: '',
        questionType: '',
    }

    setNumQuestions = (numQuestions) => {
        this.setState({
            numQuestions: parseInt(numQuestions),
        });
    }

    setCategory = (category) => {
        this.setState({
            category: parseInt(category),
        });
    }

    setDifficulty = (difficulty) => {
        this.setState({
            difficulty,
        });
    }

    setQuestionType = (questionType) => {
        this.setState({
            questionType,
        });
    }

    handleSubmit = (event, cb) => {
        event.preventDefault();
        const queryParams = {
            amount: this.state.numQuestions,
            category: this.state.category,
            difficulty: this.state.difficulty,
            type: this.state.questionType,
            encode: 'url3986',
        };
        const queryString = Object.keys(queryParams)
            .map(key => {
                if(queryParams[key]) {
                    return `${key}=${queryParams[key]}`
                }
                return '';
            })
            .filter(item => item !== '').join('&');
        const URI = `https://opentdb.com/api.php?${queryString}`
        fetch(URI)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.statusText);
            })
            .then(data => {
                console.log(data);
                cb(data.results);
            })
            .catch(error => console.log(error));

    }

    render() {

        const categories = PubCategories.map(category => 
            <option key={category.id} value={category.id}>{category.name}</option>
            );

        return (
            <form onSubmit={e => this.handleSubmit(e, this.context.handleNewQuestionsPub)}>
                <label htmlFor="num-qs">How many questions would you like?</label>
                <input 
                    id="num-qs" 
                    type="number" 
                    min="5" 
                    max="50" 
                    value={this.state.numQuestions} 
                    onChange={e => this.setNumQuestions(e.target.value)}
                    required />
                <label htmlFor="category">Select a category, if you'd like:</label>
                <select id="category" onChange={e => this.setCategory(e.target.value)}>
                    <option value="0">Mixed</option>
                    {categories}
                </select>
                <label htmlFor="difficulty">Select a difficulty</label>
                <select id="difficulty" onChange={e => this.setDifficulty(e.target.value)}>
                    <option value="">Mixed</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="question-type">Select a question type:</label>
                <select id="question-type" onChange={e => this.setQuestionType(e.target.value)}>
                    <option value="">Mixed</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True/False</option>
                </select>
                <button type="submit">Trivia Time!</button>
            </form>
        );
    }
}

export default PubForm;