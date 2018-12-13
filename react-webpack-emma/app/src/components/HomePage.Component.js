import React from 'react';
import Spotify from 'spotify-web-api-js';
import SpotifyIcon from '../../src/images/Spotify.png';
import { MainNavigation } from '../../src/components/MainNavigation.Component';
import { Link } from 'react-router-dom';


const spotifyWebApi = new Spotify();

export class HomePage extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                song: 'not checked',
                image: ''
            }
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token)
        }

        this.getNowPlaying = this.getNowPlaying.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.getNowPlaying()
        }, 10000)
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

    getNowPlaying() {
        console.log("getNowPlaying");
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        song: response.item.name,
                        artist: response.item.artists[0].name,
                        album: response.item.album.name,
                        image: response.item.album.images[0].url,
                        duration: response.item.duration_ms,
                        position: response.progress_ms
                    }
                })

            })
    }

    render() {
        return (
            <div>
                <img className="icon" src={SpotifyIcon} />
                <MainNavigation myFunction={this.getNowPlaying} />


                <div>
                    <h2>{this.state.nowPlaying.song} </h2>
                    <h3>{this.state.nowPlaying.album}</h3>
                    <h3>{this.state.nowPlaying.artist}</h3>
                </div>
                <div>
                    <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
                </div>

                <div id="progress">
                    <div id="bar" style={{ width: ((this.state.nowPlaying.position / this.state.nowPlaying.duration) * 100 + '%') }}></div>
                </div>
                <Link to="/playlist"><button>My playlist</button></Link>
            </div>
        );
    }
}



// const progress = (this.state.nowPlaying.position);
// console.log(progress)

