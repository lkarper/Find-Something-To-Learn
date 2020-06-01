import React, { Component } from 'react';
import PubContext from '../PubContext/PubContext';

class WikiPages extends Component {

    static contextType = PubContext;

    render() {
        const data = this.props.pages;
        console.log(data);
        const pagesHTML = Object.keys(data).map((key, i) => {
            return (
                <li key={i}>
                    <h3><b>{data[key].title}</b></h3>
                    <p>{data[key].extract}</p>
                    <a href={`https://en.wikipedia.org/wiki/${data[key].title.split(" ").join("_")}`} target="_blank" rel="noopener noreferrer">Learn more on Wikipedia!</a>
                    <button 
                        type="button" 
                        onClick={() => this.context.addToLearningList(key, data[key])}
                        disabled={Object.keys(this.context.learningList).includes(key)}
                        >Add to learning list!</button>
                    {Object.keys(this.context.learningList).includes(key) ? <p>Added to learning list!</p> : ''}
                </li>
            );
        });

        const noResultsHTML = <li>Looks like something went wrong while searching Wikipedia: no results found.</li>
        const loadingHTML = <li>Search Wikipedia...</li>

        return (
            <ol>
                {this.props.fetched ? (pagesHTML.length > 0 ? pagesHTML : noResultsHTML) : loadingHTML}
            </ol>
        );
    }
}

export default WikiPages;