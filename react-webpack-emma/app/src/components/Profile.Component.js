import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppNavbar } from './AppNavbar.Component';
import { GetNowPlaying } from './getNowPlaying.Component';
import List from './List.Component';

export class Profile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            term: "",
            items: [],
            iconName: "My profile",
            dumbString: "Shut the fuck up Ryan"
        };
    }


    render() {
        return (
            <div className="App">
                <AppNavbar iconName={this.state.iconName} />


                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center profileHeading">My favourite Songlist </h1>
                        <List />

                    </div>
                </div>

                <GetNowPlaying />


            </div>
        );
    }
}

