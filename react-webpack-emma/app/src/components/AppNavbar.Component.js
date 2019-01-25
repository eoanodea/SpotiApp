import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { Login } from './Login.Component';
import Spotify from 'spotify-web-api-js';
import { FormModal } from './FormModal.Component';

const spotifyWebApi = new Spotify();

export class AppNavbar extends React.Component {
    constructor(props) {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                song: '',
                image: ''
            },
            iconName: 'SpotiApp'
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token)
        }

        this.profile = this.profile.bind(this);
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

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    profile() {
        let profile = false;
        if (window.location.href.includes('#access_token')) {
            profile = true;
            return (
                <NavLink onClick={this.logout}>Log Out</NavLink>
                //this.state.nowPlaying.song
            );
        } else {
            profile = false;
            return (
                <div>
                    <FormModal />
                </div>
            );
        }
    }

    render() {
        console.log(this.props.iconName);
        return (
            <div>

                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/" >
                            {this.props.iconName}
                        </NavbarBrand>
                        <Nav className="d-block d-sm-none">
                            <NavItem>
                                <NavLink>
                                    <i id="refreshIcon" className="material-icons" href="#" onClick={this.props.myFunction}>refresh</i>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink>
                                        <i id="refreshIcon" className="material-icons d-none d-sm-block" href="#" onClick={this.props.myFunction}>refresh</i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>

                                </NavItem>
                                <NavItem className="d-none d-sm-block">
                                    <NavLink>
                                        <div className="divider"></div>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <this.profile />
                                </NavItem>
                            </Nav>
                        </Collapse>

                    </Container>
                </Navbar>
            </div>
        )
    }
}