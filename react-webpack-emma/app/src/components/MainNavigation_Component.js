import React from 'react';



export class MainNavigation extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav>
                        <button><a href="http://localhost:8888/login">Login to Spotify</a></button>
                        <button onClick={() => this.getNowPlaying()}>Check now playing</button>
                        <div className="divider"></div>
                    </nav>
                </header>
            </div>
        );
    }
}

