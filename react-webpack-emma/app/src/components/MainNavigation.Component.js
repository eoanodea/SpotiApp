import React from 'react';
import Spotify from 'spotify-web-api-js';
import SpotifyIcon from '../images/Spotify.png';

const spotifyWebApi = new Spotify();

export class MainNavigation extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                song: '',
                image: ''
            }
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token)
        }

        this.profile = this.profile.bind(this);
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    
    
    profile() {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                nowPlaying: {
                    song: response.item.name,

                    //user profile picture to be added here
                }
            })

        })

        let profile = false;
        if(window.location.href.includes('#access_token')) {
            profile = true;
            return (
                <a href="http://localhost:8888/">Log Out</a>
                //this.state.nowPlaying.song
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
                    
                    <nav>
                        <i id="refreshIcon" className="material-icons" href="#" onClick={this.props.myFunction}>refresh</i>
                        <div className="divider"></div>
                        

                        <this.profile />
                        
                    </nav>
                </header>
            </div>
        );
    }
}

