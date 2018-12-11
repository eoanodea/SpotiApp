import React from 'react';
import SpotifyIcon from '../images/Spotify.png';

export class MainNavigation extends React.Component {
    
    profile() {
        let profile = false;
        if(window.location.href.includes('#access_token')) {
            profile = true;
            return (
                <h1></h1>// <h1>{this.props.myFunction.nowPlaying.song}</h1>
            );
        } else {
            profile = false;
            return (
                <a href="http://localhost:8888/login">Login</a>
            );
        }
    }

    render() {
        return (
            <div className="header">
                <header>
                    <img className="icon" src={SpotifyIcon} />
                    <this.profile />
                    <nav>
                        <i id="refreshIcon" className="material-icons" href="#" onClick={this.props.myFunction}>refresh</i>
                        <div className="divider"></div>
                        

                        <a href="http://localhost:8888/login">Login</a>
                        
                    </nav>
                </header>
            </div>
        );
    }
}

