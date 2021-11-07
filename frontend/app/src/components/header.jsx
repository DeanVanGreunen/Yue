import React, { createRef, forwardRef } from "react";

import API from "./../service/api";

import './header.css';

export default class HeaderComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          credits: 0
      };
    }
    
    render() {
        // HTML
        return (
            <div className="header">
                <span>CreditGain</span>
                <span>You have { this.state.credits } Credits</span>
            </div>
        );
      }
}