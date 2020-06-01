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

    return (
        <ol>
            {pagesHTML}
        </ol>
    );
}

export default WikiPages;