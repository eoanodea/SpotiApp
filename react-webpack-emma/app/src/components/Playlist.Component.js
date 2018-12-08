import React from 'react';
import Component from 'react';

export class Aggregate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="aggregate">
                <h2>Number Text</h2>
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
            </div>
        );
    }
}



