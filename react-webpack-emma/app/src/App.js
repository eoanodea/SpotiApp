import React, { Component } from 'react';
import './scss/style.min.css';
import { HomePage } from '../src/components/HomePage.Component';



class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <HomePage />
            </div>

        );

    }

}

export default App;


// const progress = (this.state.nowPlaying.position);
// console.log(progress)

