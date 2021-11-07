import React, { createRef, forwardRef } from "react";

import API from "./../service/api";
import HeaderComponent from './../components/header';

import './new.css';

export default class NewQuestionPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.titleInputRef = createRef();
      this.descriptionInputRef = createRef();

      this.goBack = this.goBack.bind(this);
      this.submitQuestion = this.submitQuestion.bind(this);
    }

    async submitQuestion(e){
        let title = this.titleInputRef.current.value;
        let description = this.descriptionInputRef.current.value;
        let api_key = localStorage.getItem('api_key');
        let result = await API.question.create(api_key, title, description);
        if(result['success']){
            window.location.href = "/dashboard";
        } else {
            alert("Error creating question");
        }
    }

    goBack(){
        window.location.href = "/dashboard";
    }
    
    render() {
        // HTML
        return (
            <>  
                <HeaderComponent></HeaderComponent>
                <button className="open-new-question" onClick={this.goBack}>Go Back</button>
                <div className="create-quesiton-form">
                    <h4>Title</h4>
                    <input ref={this.titleInputRef}/>
                    <h4>Description</h4>
                    <textarea ref={this.descriptionInputRef}></textarea>
                    <button className="submit-new-question" onClick={this.submitQuestion}>Submit Question</button>
                </div>
            </>
        );
      }
}