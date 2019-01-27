import React from 'react';
import Spotify from 'spotify-web-api-js';
import { AppNavbar } from './AppNavbar.Component';
import SpotifyIcon from '../images/Spotify.png';
import { FormModal } from './FormModal.Component';
import { GetNowPlaying } from './getNowPlaying.Component';
import{ Button } from 'reactstrap'

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    isLoggedIn() {
        if(!window.location.href.includes('#access_token')) {
            return(
                <Button color="primary" size="lg" active><FormModal /></Button>
            );
        }
    }
    render() {  
        return (
            <div className="homepage">
                <AppNavbar/>
                <div className="homepageContent">
                <div className="container">
                <img className="icon" src={SpotifyIcon}/>
                
                <h1 id="title" className="fade-in">SpotiApp</h1>
                {this.isLoggedIn()}
                </div>
                </div>
                <GetNowPlaying />
            </div>
        );
    }
}

