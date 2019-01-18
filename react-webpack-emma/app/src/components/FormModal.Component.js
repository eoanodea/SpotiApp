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
    componentWillMount = () => {
      
    }
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
    loggedIn = (props) => {
       
        
    }


    //This is FormModal.Component
    render() {
        return(
            <div>
                <Button onClick={this.loggedIn()} />
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
