import React, { Component } from 'react';
import 'whatwg-fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Input,
    TabContent, 
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Alert
} from 'reactstrap';
import classnames from 'classnames';

import {
  getFromStorage,
  getInStorage,
  setInStorage
} from '../../utilities/storage';
import { AppNavbar } from './AppNavbar.Component';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      loggedIn: false
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

    this.toggle = this.toggle.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

    this.state = {
      activeTab: '1'
    };

  }
  
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      //Verify token with GET request
      fetch('http://localhost:5000/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }


  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }
  onSignUp() {
    //Grab State
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;
    
    this.setState({
      isLoading: true
    });
    //Post request to backend
    fetch('http://localhost:5000/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
<<<<<<< HEAD
            signUpLastName: '',
            alertMessage: "success"
          }); 
        
          this.toggle('1');
=======
            signUpLastName: ''
          });
>>>>>>> e23526568ca89265bc4729de33addbb34938b718
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            alertMessage: "danger"
          });

        }
      });
  }
  onSignIn() {
    //Grab State
    const {
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true
    });
<<<<<<< HEAD
    // Close modal
    this.toggle();
=======
    //Post request to backend
    fetch('http://localhost:5000/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token
          });
          console.log("token received");
          window.location.replace("http://localhost:8080/profile/");
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });

>>>>>>> e23526568ca89265bc4729de33addbb34938b718
  }
  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      //Verify token with GET request
      fetch('http://localhost:5000/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }

  }

  isLoggedIn = (props) => {
    if(!token) {
      this.setState({
        loggedIn: true

      })
      return(
        <NavLink className="navLogin" onClick={this.toggle}>Login</NavLink>
      );
    } else {
      this.setState({
        loggedIn: false
      })
      return(
        <NavLink className="navLogin" onClick={this.logout}>Logout</NavLink>
      );
    }

    const loggedIn = this.props.loggedIn;

  }
  

  toggle(tab) {
    if (this.state.activeTab !== tab) {
        this.setState({
        activeTab: tab
        });
    }
}

  render() {

    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
      alertMessage,
      loggedIn
    } = this.state;
    
    return(
      <FormModal loggedIn={this.props.alertMessage} />
    );

    if (isLoading) {
<<<<<<< HEAD
      return(<div><p>Loading...</p></div>);
      
    }
    if (!isLoading || token) {
    return (
      <div>
        
        <Nav tabs>
            <NavItem>
                <NavLink
                className={
                    classnames({ 
                    active: this.state.activeTab === '1'
                    })
                }
                onClick = { () => {
                    this.toggle('1');
                }
                }
                >Sign In
            </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={
                    classnames({ 
                    active: this.state.activeTab === '2'
                    })
                    }
                    onClick = { () => {
                    this.toggle('2');
                    }
                    }
                    >Sign Up
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <TabPane active="true" tabId="1">
          <Form onSubmit={this.onSignIn}>
              <FormGroup>
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    value={signInEmail}
                    onChange={this.onTextboxChangeSignInEmail}
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={signInPassword}
                    onChange={this.onTextboxChangeSignInPassword}
                  />
                  <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block
                  >Sign In</Button>
              </FormGroup>
          </Form>
          {
            (signUpError) ? (
              <Alert id="alert" color={alertMessage.toString()} style={{ marginTop: '10px' }}>
              {signUpError}
            </Alert>
            ) : (null)
          }
          {
          (signInError) ? (
            <Alert id="alert" style={{ marginTop: '10px' }}>
              {signInError}
            </Alert>
          ) : (null)
          }
        </TabPane>
        <TabPane tabId="2">
          <Form onSubmit={this.onSignUp}>
              <FormGroup>
                  <Input 
                    type="text" 
                    placeholder="First Name" 
                    value={signUpFirstName}
                    onChange={this.onTextboxChangeSignUpFirstName}
                  />
                  <Input 
                    type="text" 
                    placeholder="Last Name" 
                    value={signUpLastName}
                    onChange={this.onTextboxChangeSignUpLastName}
                  />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword}
                  />
                  <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block
                  >Sign Up</Button>
              </FormGroup>
          </Form>
          {
            (signUpError) ? (
              <Alert id="alert" color={alertMessage.toString()} style={{ marginTop: '10px' }}>
              {signUpError}
            </Alert>
            ) : (null)
          }
          </TabPane>
        </TabContent>
      </div>
=======
      return (<div><p>Loading...</p></div>);
    }
    if (!token) {
      return (
        <div>
          <AppNavbar />
          <div className="container">

            <div className="form-signin">
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              <h1 className="h3 mb-3">Sign In</h1>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}

              /><br />
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}

              /><br />
              <button className="btn btn-lg btn-primary btn-block" onClick={this.onSignIn}>Sign In</button>
            </div>
            <br />
            <div>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <h1 className="h3 mb-3">Sign up</h1>
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
                value={signUpFirstName}
                onChange={this.onTextboxChangeSignUpFirstName}
              /><br />
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                value={signUpLastName}
                onChange={this.onTextboxChangeSignUpLastName}
              /><br />
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
              /><br />
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
              /><br />
              <button className="btn btn-lg btn-success btn-block" onClick={this.onSignUp}>Sign Up</button>
            </div>
          </div>
        </div>

>>>>>>> e23526568ca89265bc4729de33addbb34938b718
      );
    }
      
    return (
      <div>
        <p>Please wait...</p>
        {/* <button onClick={this.logout}>Logout</button> */}
      </div>
    );
  }
}
  


