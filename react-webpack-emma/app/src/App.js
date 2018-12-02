import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
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
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        song: response.item.name,
                        
                        image: response.item.album.images[0].url,
                        duration: response.item.duration_ms

                    }
                })

            })
    }
 
    render() {
        return (
            <div>
                <h1>My React App!</h1>
                <a href='http://localhost:8888/login'>
                    <button>Login With Spotify</button>

                </a>
                <div>
                    Now playing: {this.state.nowPlaying.song} 
                </div>
                <div>
                    <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
                </div>
                <button onClick={() => this.getNowPlaying()}>
                    Check Now playing
                </button>
                <script>

                </script>
            </div>
        );
    }
}
// var songDuration = this.state.nowPlaying.duration;

// console.log(songDuration);
export default App;