import React from 'react';

const WikiPages = (props) => {
    const data = props.pages;
    console.log(data);
    const pagesHTML = Object.keys(data).map((key, i) => {
        return (
            <li key={i}>
                <h3><b>{data[key].title}</b></h3>
                <p>{data[key].extract}</p>
                <a href={`https://en.wikipedia.org/wiki/${data[key].title.split(" ").join("_")}`} target="_blank" rel="noopener noreferrer">Learn more on Wikipedia!</a>
            </li>
        );
    });

    const noResultsHTML = <li>Looks like something went wrong while searching Wikipedia: no results found.</li>
    const loadingHTML = <li>Search Wikipedia...</li>

    return (
        <ol>
            {props.fetched ? (pagesHTML.length > 0 ? pagesHTML : noResultsHTML) : loadingHTML}
        </ol>
    );
}

export default WikiPages;