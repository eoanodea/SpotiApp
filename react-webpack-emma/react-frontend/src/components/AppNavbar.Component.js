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
import { FormModal } from './FormModal.Component';

export class AppNavbar extends React.Component {
    constructor(props) {
        super();
        this.state = {
            iconName: 'SpotiApp'
        }

        this.profile = this.profile.bind(this);
    }
    /*
    // Toggle & state for responsive burger menu
    */
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    /*
    // If the user has an access token, display the profile page.
    // Else display the FormModal to allow the user to log in
    */

    profile() {
        let profile = false;
        if (window.location.href.includes('#access_token')) {
            profile = true;
            return (
                <NavLink href="/profile/">Profile</NavLink>
            
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

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/" >
                            {this.props.iconName}
                        </NavbarBrand>

                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">
                                        Home
                                    </NavLink>
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