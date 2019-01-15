import React from 'react';
import Spotify from 'spotify-web-api-js';
import { AppNavbar } from './AppNavbar.Component';
import 'bootstrap/dist/css/bootstrap.min.css';


const spotifyWebApi = new Spotify();


export class HomePage extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyWebApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                albumArt: ''
            }
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
    getNowPlaying() {

        let loggedIn = false;
        if (window.location.href.includes('#access_token')) {
            loggedIn = true;
            var refreshIcon = document.getElementById('refreshIcon');
            if (refreshIcon.className === "material-icons rotate") {
                refreshIcon.className = "material-icons rotate2";
            } else {
                refreshIcon.className = "material-icons rotate";
            }
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
                    });
                })
        }
        else {
            loggedIn = false;
            console.log(loggedIn)
            this.setState({
                nowPlaying: {
                    song: 'Please Log In',
                    image: ''
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
            <div>
                {/* <MainNavigation myFunction={this.getNowPlaying} /> */}
                <AppNavbar myFunction={this.getNowPlaying} />
                <div className="container">

                    <div>
                        <h2>{this.state.nowPlaying.name} </h2>
                        <h3>{this.state.nowPlaying.album}</h3>
                        <h3>{this.state.nowPlaying.artist}</h3>
                    </div>
                    <div>
                        <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
                    </div>

                    <div id="progress">
                        <div id="bar" style={{ width: ((this.state.nowPlaying.position / this.state.nowPlaying.duration) * 100 + '%') }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

