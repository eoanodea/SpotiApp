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
            lastPlaying: [
                {
                    song: '',
                    artist: '',
                    album: '',
                    image: ''
                }
            ],
            iconName: "SpotiApp",
            spotifyToken: token
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

    getNowPlaying = () => {
        let nowPlaying = document.getElementById('nowPlaying');
        if(this.state.loggedIn === true) {
            nowPlaying.style.height = '130px';
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
        
        } else {
            console.log("false state");
            nowPlaying.style.height = '0px';
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
    refreshIcon = () => {
        let refreshIcon = document.getElementById('rotate');
            if(refreshIcon.className == 'material-icons d-none d-sm-block rotate') {
                console.log('ye')
                refreshIcon.className = 'material-icons d-none d-sm-block rotate2';
            } else {
                refreshIcon.className = 'material-icons d-none d-sm-block rotate';
            }

        this.getNowPlaying();
    }
    
    componentDidMount() {
         setInterval(() => {
            this.getNowPlaying()
        }, 1000)
    }


    render() {
        return (
           <div id="nowPlaying" className="nowPlaying">
                    <div className="nowPlayingContainer">
                        <div className="nowPlayingName">
                            <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
                            <div className="nowPlayingNameText">
                                <p className="nowPlayingNameTextSong">{this.state.nowPlaying.song}</p>
                                <p className="nowPlayingNameTextArtist">{this.state.nowPlaying.artist}</p>
                            </div>
                        </div>
                        <div className="nowPlayingProgressWrapper">
                        <div className="nowPlayingProgressBackground">
                            <div className="nowPlayingProgressbar" style={{ width: ((this.state.nowPlaying.position / this.state.nowPlaying.duration) * 100 + '%') }}></div>
                        </div>
                        </div>
                        <i id="rotate" className="material-icons d-none d-sm-block rotate" href="#" onClick={this.refreshIcon}>refresh</i>

                    </div>
                    
                </div>
        );
    }
}

