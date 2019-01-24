import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { AppNavbar } from './AppNavbar.Component';
import Default from '../images/default.png';

const spotifyWebApi = new Spotify();

export class GetNowPlaying extends React.Component {
    constructor(props) {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyWebApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: {
                name: '',
                image: '',

            },
            iconName: "SpotiApp"
        }

        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token)
        }

        this.getNowPlaying = this.getNowPlaying.bind(this);
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
    getNowPlaying () {
        var refreshIcon = document.getElementById('refreshIcon');
        if (refreshIcon.className == "material-icons d-none d-sm-block rotate") {
            refreshIcon.className = "material-icons d-none d-sm-block rotate2";
            console.log("rotate");
        } else {
            refreshIcon.className = "material-icons d-none d-sm-block rotate";
            console.log("rotate2");
        }
        let loggedIn = false;
        if (window.location.href.includes('#access_token')) {
            loggedIn = true;
            spotifyWebApi.getMyCurrentPlaybackState()
                .then((response) => {
                    this.setState({
                        nowPlaying: {
                            song: response.item.name,
                            artist: response.item.artists[0].name,
                            album: response.item.album.name,
                            image: response.item.album.images[0].url,
                            duration: response.item.duration_ms,
                            position: response.progress_ms,
                            
                        }
                    });
                })
                console.log("fetch");
        }
         else {
            loggedIn = false;
            console.log(loggedIn)
            this.setState({
                nowPlaying: {
                    song: 'Song',
                    album: 'Album',
                    artist: 'Artist',
                    image: Default,
                    
                }
            })

        }
    }
    componentDidMount() {
        if (this.getNowPlaying.loggedIn = true) setInterval(() => {
            this.getNowPlaying()
        }, 10000)
    }


    render() {
        return (
           <div className="nowPlaying">
                <div className="container">
                    <div className="nowPlayingContainer">
                        <div className="nowPlayingName">
                            <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
                            <p>{this.state.nowPlaying.song}</p>
                            <p>{this.state.nowPlaying.artist}</p>
                        </div>
                    </div>
                    <div id="progress">
                        <div id="bar" style={{ width: ((this.state.nowPlaying.position / this.state.nowPlaying.duration) * 100 + '%') }}></div>
                    </div>
                        <i id="refreshIcon" className="material-icons d-none d-sm-block rotate" href="#" onClick={this.getNowPlaying}>refresh</i>
                    </div>
                </div>
        );
    }
}

