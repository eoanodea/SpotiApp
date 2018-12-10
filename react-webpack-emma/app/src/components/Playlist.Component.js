import React from 'react';


export class Aggregate extends React.Component {
    render() {
        return (
            <div className="aggregate">
                <h2>Number Text</h2>
            </div>
        );
    }
}

export class Filter extends React.Component {
    render() {
        return (
            <div className="filter">
                <img />
                <input type="text" />
                Filter
            </div>
        )
    }
}

export class List extends React.Component {
    render() {
        return (
            <div className="list">

                <h1>Playlists</h1>
                <ol>
                    <li>Song2</li>
                    <li>Song2</li>
                    <li>Song3</li>
                    <li>Song4</li>
                </ol>
            </div>
        );
    }
}

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <h1 style={{ color: "#fff" }}>My Playlist</h1>
                <Aggregate />
                <Aggregate />
                <Filter />
                <List />
            </div>
        );
    }
}



