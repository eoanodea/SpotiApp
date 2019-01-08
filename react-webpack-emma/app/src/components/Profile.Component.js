import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppNavbar } from './AppNavbar.Component';
import { SongList } from './SongList.Component';

import List from './List.Component';
export class Profile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            term: "",
            items: []
        };
    }
    render() {
        return (
            <div className="App">

                <AppNavbar />
                <SongList />

                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center">TODO </h1>
                        <List />
                    </div>
                </div>

            </div>
        )
    }
}

