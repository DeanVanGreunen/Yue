import React, { createRef, forwardRef } from "react";

import API from "./../service/api";

import './dashboard.css';

export default class DashboardPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          questions: []
      };

      this.openQuestion = this.openQuestion.bind(this);
    }

    openQuestion(e){

    }
    
    render() {
        // HTML
        return (
            <div>
                <div>
                    <h4 style={{color:'#FFF'}}>Welcome to this prototype app, create and answer questions to earn credits</h4>
                </div>
                <div className="add_question">Create new Question</div>
                <div className="question_list">
                    {
                        this.state.questions.map((question, index)=>{
                            return <div key={index}><h4>{ question.title }</h4><button question-id={question.id} onClick={this.openQuestion}>Open</button></div>
                        })
                    }
                    {
                        this.state.questions.length == 0 ? <span style={{lineHeight:'64px'}}>No Questions avaliable</span> : <></>
                    }
                </div>
            </div>
        );
      }
}