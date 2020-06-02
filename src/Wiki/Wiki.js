import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import WikiPages from '../WikiPages/WikiPages';

class Wiki extends Component {

    static contextType = AppContext;

    state = {
        pages: {},
        fetched: false
    }

    formWikiQuery = () => {
        const { questions } = this.context;
        console.log(questions);
        const question = questions[this.props.match.params.qId];
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
            srsearch: encodeURI(searchString),
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
        const pageIDs = [];
        for (let result of data) {
            pageIDs.push(result.pageid);
        }
        const pages = pageIDs.join("%7C");
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
        const queryArray = Object.keys(params).map(key => {
            return `${key}=${params[key]}`;
        });
        console.log(queryArray);
        const queryString = queryArray.join("&");
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
        this.fetchWikipediaInfo();
    }

    render() {
        const currentId = this.props.match.params.qId;

        const path = this.props.match.path.indexOf('pubstyle') !== -1 ? 'pubstyle' : 'jeopardy';
        
        return (
            <>
                <h2>Wiki Info</h2>
                <div className="Wiki__wContainer">
                    <WikiPages pages={this.state.pages} fetched={this.state.fetched}/>
                    <Link 
                        to={parseInt(currentId) + 1 === this.context.totalQuestions ? `/${path}/${currentId}/final` : `/${path}/${(parseInt(currentId)+1)}`}
                    >Next Question</Link>
                </div>
            </>
        );
    }

}

export default Wiki;