import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppNavbar } from './AppNavbar.Component';
import { SongList } from './SongList.Component';

export class Profile extends React.Component {
    render() {
        return (
            <div className="App">

                <AppNavbar />
                <SongList />
            </div>
        )
    }
}

