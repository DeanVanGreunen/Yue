import React, { createRef, forwardRef } from "react";

import API from "./../service/api";

import './login.css';

export default class LoginPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isError: false, errorMessage: ""}; // isError -> errorMessage

      this.emailRef = createRef();
      this.passwordRef = createRef();

      // bind
      this.handleLogin = this.handleLogin.bind(this);
    }

    // handle login
    async handleLogin(){
        let email =  this.emailRef.current.value;
        let password =  this.passwordRef.current.value;
        let result = await API.user.login(email, password);
        let api_key = result['api_key'];
        if(api_key){
            localStorage.setItem('api_key', api_key);
            window.location.href = "/dashboard";
        } else {
            this.setState({...this.state, isError: true, errorMessage: "invalid login details"});
        }
    }

    render() {
        // HTML
        return (
            <div className="outer">
                <div className="middle">
                    <div className="container">
                        <div className="form">
                            <h4>Login</h4>
                            <input id="email" placeholder="Email Address" defaultValue="" ref={this.emailRef} autoComplete={false}/>
                            <input id="password" type="password" placeholder="Password" defaultValue="" ref={this.passwordRef} autoComplete={false}/>
                            {   
                                this.state.isError ? (
                                    <span className="error">{this.state.errorMessage}</span>
                                ) : ''
                            }
                            <button id="login" onClick={this.handleLogin}>LOGIN</button>
                            <a href="/register">Not a member? Register Here</a>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}