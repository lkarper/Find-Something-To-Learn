import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext/AppContext';
import WikiPages from '../WikiPages/WikiPages';

class Wiki extends Component {

    static defaultProps = {
        match: {
            params: {
                qId: '',
            },
        },
    }    
    static contextType = AppContext;

    state = {
        pages: {},
        fetched: false
    }

    formWikiQuery = () => {
        const { questions, currentQuestion } = this.context;
        const question = questions[currentQuestion - 1];
        if (Object.keys(question).includes('type')) {
            if (question.type !== 'boolean') {
                let correctAnswerQuery = decodeURI(question.correct_answer.toLowerCase().split(/[ ,!.'";:-]+/).filter(Boolean).join(' '));
                let questionQuery = decodeURI(question.question.toLowerCase().split(/[ ,!.'";:-]+/).filter(Boolean).join(' '));
                console.log(correctAnswerQuery, questionQuery);
                if (correctAnswerQuery.search(/\d+/g) !== -1) {
                    return `${questionQuery} ${correctAnswerQuery}`;
                } else {
                    return `${correctAnswerQuery} ${questionQuery}`;
                }
            } else {
                const questionQuery = decodeURI(question.question.toLowerCase().split(/[ ,!.'";:-]+/).filter(Boolean).join(' '));
                console.log(questionQuery);
                return `${questionQuery}`;
            }
        } else {
            let questionQuery = question.question.match(/([A-Z]\w+)|[A-Z]+/g);
            if (questionQuery) {
                questionQuery = questionQuery.join(' ');
            }
            const answerQuery = question.answer.toLowerCase().split(/[ ,!.'";:-]+/).filter(Boolean).join(' ');
            return `${answerQuery} ${questionQuery}`;
        }
    }

    formWikiURL = (searchString) => {
        const baseURL = "https://en.wikipedia.org/w/api.php?";
        const params = {
            origin: "*",
            action: "query",
            format: "json",
            list: "search",
            srsearch: encodeURIComponent(searchString),
            prop: "info",
            srquiprofile: "popular_inclinks_pv",
            srwhat: "text",
            srprop: "snippet|titlesnippet"
        }
        const queryArray = Object.keys(params).map(key => {
            return `${key}=${params[key]}`;
        });
        console.log(queryArray);
        const queryString = queryArray.join("&");
        return `${baseURL}${queryString}`;
    }

    getWikiPages = (responseJson) => {
        const data = responseJson.query.search;
        console.log(data);
        const pages = data
            .map(result => result.pageid)
            .join("%7C");
        const params = {
            origin: "*",
            action: "query",
            format: "json",
            prop: "extracts",
            pageids: pages,
            exchars: 1200,
            exintro: 1,
            explaintext: 1
        }
        const queryString = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join("&");
        const url = `https://en.wikipedia.org//w/api.php?${queryString}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if (Object.keys(responseJson).includes('query')) { 
                    this.setState({
                        pages: responseJson.query.pages
                    });
                }
                this.setState({
                    fetched: true,
                });
            });
    }

    fetchWikipediaInfo = () => {
        const queryString = this.formWikiQuery();
        const url = this.formWikiURL(queryString);
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.getWikiPages(responseJson));
    }

    componentDidMount() {
        if (Object.keys(this.context).length && Object.keys(this.context).includes('questions')) {
            this.fetchWikipediaInfo();
        }
    }

    render() {

        const errorHTML = (
            <>
                <h2>Error</h2>
                <p>Looks like something went wrong and question and answer data could not be loaded.</p>
            </>
        );

        if (Object.keys(this.context).includes('questions')) {
            
            return (
                <>
                    <h2>Wiki Info</h2>
                    <div className="Wiki__wContainer">
                        <WikiPages pages={this.state.pages} fetched={this.state.fetched}/>
                        <button type="button" onClick={() => this.context.goToNextQuestion()}>Next Question</button>
                    </div>
                </>
            );
        }

        return (
            <div className="Wiki__wContainer">
                {errorHTML}
            </div>
        );

    }
}

Wiki.propTypes = {
    match: PropTypes.object.isRequired,
}

export default Wiki;