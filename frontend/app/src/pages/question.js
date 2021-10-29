import React, { createRef, forwardRef } from "react";

import API from "./../service/api";

import './question.css';

export default class QuestionPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          question: null
      };
    }

    openQuestion(e){

    }
    
    render() {
        // HTML
        return (
            <div>
                <div>
                    <h4 style={{color:'#FFF'}}>Question Preview</h4><br />
                    <div>sss</div>
                </div>
            </div>
        );
      }
}