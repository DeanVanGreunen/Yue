import React from "react";
import { createRef } from 'react';

import API from './../service/api';

export default class RegisterPage extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {errorMessage: ""}; // isError -> errorMessage

      // bind
      this.handleRegister = this.handleRegister.bind(this);
      
      // setup refs
      this.emailRef = createRef();
      this.passwordRef = createRef();
      this.passwordConfirmRef = createRef();
      this.errorRef = createRef();
    }

    // handle login
    async handleRegister(){
      this.errorRef.current.innerHTML = "";
      if(!this.emailRef.current.value){
        this.errorRef.current.innerHTML = "Enter a valid email address";
        return;
      } else if(!this.passwordRef.current.value){
        this.errorRef.current.innerHTML = "Enter a valid password";
        return;
      } else if(!this.passwordConfirmRef.current.value){
        this.errorRef.current.innerHTML = "Please confirm your password";
        return;
      } else if(this.passwordRef.current.value !== this.passwordConfirmRef.current.value){
        this.errorRef.current.innerHTML = "Your passwords don't match";
        return;
      }

      let email = this.emailRef.current.value;
      let password = this.passwordRef.current.value;
      let result = await API.user.check(email);
      let exists = result['success'];
      if(exists == true){
        this.errorRef.current.innerHTML = "Email already in use.";
        return;
      }
      result = await API.user.register(email, password);
      let api_key = result['api_key'];
      if(api_key == false){
        this.errorRef.current.innerHTML = "Error Registrating";
        return;
      }

      // Capture into local storage
      localStorage.setItem('api_key', api_key);

      // Redirect to dashboard if registartion is successful.
      window.location.href = '/dashboard';
    }

    render() {
        // HTML
        return (
            <div className="outer">
                <div className="middle">
                    <div className="container">
                        <div className="loginFormLogo"></div>
                        <div className="form">
                            <h4>Registration Form</h4>
                            <input ref={this.emailRef} id="email" placeholder="Email Address" defaultValue="" onChange={this.checkEmail}/>
                            <input ref={this.passwordRef} id="password" placeholder="Password" defaultValue=""/>
                            <input ref={this.passwordConfirmRef} id="passwordConfirm" placeholder="Confirm Password" defaultValue=""/>
                            <span ref={this.errorRef} id="error">{ this.state.errorMessage}</span>
                            <button onClick={this.handleRegister} id="next">Register</button>
                            <a href="/login">Already a member? Login Here</a>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}