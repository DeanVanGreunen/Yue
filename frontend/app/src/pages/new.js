import React, { createRef, forwardRef } from "react";

import API from "./../service/api";

import './new.css';

export default class NewQuestionPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    openQuestion(e){

    }
    
    render() {
        // HTML
        return (
            <div>
                <div>
                    <h4 style={{color:'#FFF'}}>Create Question</h4><br />
                    <div>sss</div>
                </div>
            </div>
        );
      }
}