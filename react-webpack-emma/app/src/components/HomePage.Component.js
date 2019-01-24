import React from 'react';
import Spotify from 'spotify-web-api-js';
import { AppNavbar } from './AppNavbar.Component';
// import 'bootstrap/dist/css/bootstrap.min.css';



const spotifyWebApi = new Spotify();


export class HomePage extends React.Component {
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
                name: 'Not Checked',
                albumArt: '',

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
    getNowPlaying() {

        let loggedIn = false;
        if (window.location.href.includes('#access_token')) {
            loggedIn = true;
            // var refreshIcon = document.getElementById('rotate');
            // if (refreshIcon.className === "material-icons rotate") {
            //     refreshIcon.className = "material-icons rotate2";
            // } else {
            //     refreshIcon.className = "mmaterial-icons rotate";
            // }
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
                    console.log("fetch")
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
        console.log(this.state.iconName);
        return (
            <div>
                
                <AppNavbar myFunction={this.getNowPlaying} iconName={this.state.iconName} />
                <div className="container">
                    <h2>Ryan cunt</h2>
                </div>
            </div>
        );
    }
}

