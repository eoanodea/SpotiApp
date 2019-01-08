import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  getInStorage,
  setInStorage
} from '../../utilities/storage';

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
      signUpPassword: ''
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
  }
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      //Verify token with GET request
      fetch('http://localhost:5000/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if(json.success) {
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
            signUpLastName: ''
          }); 
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
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
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false,
        });
      }
    });

  }
  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      //Verify token with GET request
      fetch('http://localhost:5000/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if(json.success) {
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
      signUpError
    } = this.state;

    if (isLoading) {
      return(<div><p>Loading...</p></div>);
    } 
    if(!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
              <p>Sign In</p>
              <input 
                type="email" 
                placeholder="Email" 
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
                
              /><br />
              <input 
                type="password" 
                placeholder="Password" 
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
                
              /><br />
              <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
              <p>Sign Up</p>
              <input 
                type="text" 
                placeholder="First Name" 
                value={signUpFirstName}
                onChange={this.onTextboxChangeSignUpFirstName}
              /><br />
              <input 
                type="text" 
                placeholder="Last Name" 
                value={signUpLastName}
                onChange={this.onTextboxChangeSignUpLastName}
              /><br />
              <input 
                type="email" 
                placeholder="Email" 
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
              /><br />
              <input 
                type="password" 
                placeholder="Password" 
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
              /><br />
              <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

