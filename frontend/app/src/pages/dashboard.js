import React, { createRef, forwardRef } from "react";

import API from "./../service/api";
import HeaderComponent from './../components/header';

import './dashboard.css';

export default class DashboardPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          questions: []
      };

      this.createQuestion = this.createQuestion.bind(this);
      this.openQuestion = this.openQuestion.bind(this);
    }

    async componentDidMount(){
        let result = await API.question.list();
        let questions = result['questions'];
        this.setState({
            ...this.state,
            questions: questions
        });
    }

    createQuestion(){
        window.location.href = "/new";
    }

    openQuestion(e){
        let question_id = parseInt(e.target.getAttribute('question-id'));
        window.location.href = "/question/" + question_id;
    }
    
    render() {
        // HTML
        return (
            <>  
                <HeaderComponent></HeaderComponent>
                <button className="open-new-question" onClick={this.createQuestion}>Create new Question</button>
                {
                    this.state.questions.length > 0 ?
                        (<div className="questions-list">
                            {
                                this.state.questions.map((question, index)=>{
                                    return (
                                        <div key={index} question-id={question.id} onClick={this.openQuestion}>{question.title}</div>
                                    );
                                })
                            }
                        </div>)
                    : <span className="no-questions">No questions have been uploaded</span>
                }
            </>
        );
      }
}