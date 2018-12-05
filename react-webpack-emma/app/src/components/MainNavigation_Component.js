import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';



export class MainNavigation extends React.Component {
    render = () => {
        return (
            <div>
                <header>

                    <nav>
                        <Router>
                            <button><Link to="http://localhost:8888/login">Login to Spotify</Link></button>
                            <button onClick={() => this.getNowPlaying()}>Check now playing</button>
                            <div className="divider"></div>
                        </Router>
                    </nav>
                </header>
            </div>
        );
    }
}

