import React, { Component } from 'react';
import './scss/style.min.css';
import { HomePage } from '../src/components/HomePage.Component';
import { Playlist } from '../src/components/Playlist.Component';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/playlist" component={Playlist} />
                    </div>
                </BrowserRouter>


            </div>

        );
    }
}

export default App;

