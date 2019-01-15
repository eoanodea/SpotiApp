import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';

import { Login } from './Login.Component';

export class FormModal extends React.Component {
    constructor(props) {
        super(props);

        
    }
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    loggedIn = (props) => {
        // var token = this.token;
        // this.props.token(token);

        // console.log(token);
        console.log("hi")
    }


    render() {
        
        const { token } = this.state;
        return(
        <div>
            <button onClick={this.loggedIn}>button</button>
            <NavLink className="navLogin" onClick={this.toggle}>Login</NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                    <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
                    <ModalBody> 
                    <Login />
                </ModalBody>
            </Modal>
        </div>
        );
    }
}
