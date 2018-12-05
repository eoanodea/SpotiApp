import React from 'react';
import { Link } from 'react-router-dom';
import './scss/style.min.css';


export class MainNavigation extends React.Component {
    render = () => {
        return (
            <div>
                <header>

                    <nav>
                        <button><Link to="http://localhost:8888/login">Login to Spotify</Link></button>
                        <button onClick={() => this.getNowPlaying()}>Check now playing</button>
                        <div className="divider"></div>
                    </nav>
                </header>
            </div>
        );
    }
}

