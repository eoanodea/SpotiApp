import React from 'react';
import Spotify from 'spotify-web-api-js';
import { AppNavbar } from './AppNavbar.Component';
import SpotifyIcon from '../images/Spotify.png';
import { FormModal } from './FormModal.Component';
import{ Button } from 'reactstrap'

export class HomePage extends React.Component {
    
    render() {
        
        return (
            <div className="homepage">
                <AppNavbar/>
                <div className="homepageContent">
                <div className="container">
                <img className="icon" src={SpotifyIcon}/>
                
                <h1 id="title" className="homepage-fade-in">SpotiApp</h1>
                <Button color="primary" size="lg" active><FormModal /></Button>
                </div>
                </div>
            </div>
        );
    }
}

