import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
    Button

} from 'reactstrap';

import { Login } from './Login.Component';

export class FormModal extends React.Component {
    constructor(props) {
        super(props);
    }
    
    /*
    // Toggle Modal
    */

    state = {
        modal: false,
        name: '',
        alertMessage: this.props.alertMessage
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    /*
    // Display only a login link until clicked, modal appears
    */

    render() {
        return(
            <div>
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
