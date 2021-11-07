import React, { createRef, forwardRef } from "react";

import API from "./../service/api";

import HeaderComponent from './../components/header';

import './question.css';

export default class QuestionPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          question: null,
          answers: null
      };

      this.goBack = this.goBack.bind(this);
    }

    async componentDidMount(){
        let url = window.location.href;
        let url_array = url.split('/');
        let qid = url_array[url_array.length-1];
        let result = await API.question.get(qid);
        let question = result['question'];
        this.setState({
            ...this.state,
            question: question
        });
    }
    goBack(){
        window.location.href = "/dashboard";
    }

    render() {
        // HTML
        return (
            <>
                <HeaderComponent></HeaderComponent>
                {
                    this.state.question == null ? <div style={{padding:'32px'}}>Loading Question, Please wait</div> : <></>
                }
                <button className="open-new-question" onClick={this.goBack}>Go Back</button>
                <div className="question-details">
                {
                    this.state.question != null ?
                        <>
                            <h4>{ this.state.question.title }</h4>
                            <p>{ this.state.question.description }</p>
                        </>
                    : <></>
                }
                {
                    this.state.answers != null ?
                        this.state.answers.map((answer, index)=>{
                            return (
                                <div>
                                    <div>{ answer.answer_selected ? "X" : "Y"}</div>
                                    <div>{ answer.text}</div>
                                </div>
                            );
                        })
                    : <></>
                }
                </div>
            </>
        );
      }
}