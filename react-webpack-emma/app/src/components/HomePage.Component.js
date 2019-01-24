import React from 'react';
import Spotify from 'spotify-web-api-js';
import { AppNavbar } from './AppNavbar.Component';
import SpotifyIcon from '../images/Spotify.png';
import { FormModal } from './FormModal.Component';
import{
    Button
} from 'reactstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';





export class HomePage extends React.Component {
    
    render() {
        
        return (
            <div id="HomePage">
                
                <AppNavbar/>
                <div className="container">
                <div class="w3-animate-opacity">
                <div id="title">Spoti-app</div>
                </div>
                <div id="getStarted">
                    <Button color="primary" size="lg" active><FormModal /></Button>
                </div>
                

                </div>
                
            </div>
        );
    }
}

