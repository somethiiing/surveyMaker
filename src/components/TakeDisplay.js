'use strict';

import React from 'react';

class TakeDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      q0Selection: '',
      q1Selection: '',
      q2Selection: '',
      q3Selection: '',
      q4Selection: '',
      q5Selection: '',
      q6Selection: '',
      q7Selection: '',
      q8Selection: '',
      q9Selection: ''
    }

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleRadioChange(event) {
    var questionNum = event.target.id[0];
    var tempState = Object.assign({}, this.state);
    tempState['q'+questionNum+'Selection'] = event.target.id.slice(1);
    this.setState(tempState);
  }

  submitForm(event) {
    event.preventDefault();
    var result = {};
    for (var key in this.state) {
      if (this.state[key] !== '') {
        result[key] = this.state[key];
      }
    }
    this.props.saveSurveyResult(result);
    this.clear();
  }

  clear() {
    this.setState({
      q0Selection: '',
      q1Selection: '',
      q2Selection: '',
      q3Selection: '',
      q4Selection: '',
      q5Selection: '',
      q6Selection: '',
      q7Selection: '',
      q8Selection: '',
      q9Selection: ''
    })
  }

  render() {

    var allQuestions = this.props.state.allQuestions;

    var that = this;

    var surveyQuestions = allQuestions.map(
      function(indQuestion, i) {
        if (indQuestion.questionType === 'Boolean') {
          return (
            <div key={i}>
            {indQuestion.questionNumber + '. ' + indQuestion.actualQuestion}
              <br />
              <input
              id={i + 'resp1'}
              type='radio'
              value={indQuestion.resp1}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp1'} /> { indQuestion.resp1 }
              <br />
              <input
              id={i + 'resp2'}
              type='radio'
              value={indQuestion.resp2}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp2'} /> { indQuestion.resp2 }
            </div>
          )
        }
        if (indQuestion.questionType === 'Multiple') {
          return (
            <div key={i}>
            {indQuestion.questionNumber + '. ' + indQuestion.actualQuestion}
            <br />
              <input
              id={i + 'resp1'}
              type='radio'
              value={indQuestion.resp1}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp1'} /> { indQuestion.resp1 }
              <br />
              <input
              id={i + 'resp2'}
              type='radio'
              value={indQuestion.resp2}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp2'} /> { indQuestion.resp2 }
              <br />
              <input
              id={i + 'resp3'}
              type='radio'
              value={indQuestion.resp3}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp3'} /> { indQuestion.resp3 }
              <br />
              <input
              id={i + 'resp4'}
              type='radio'
              value={indQuestion.resp4}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp4'} /> { indQuestion.resp4 }
            </div>
          )
        }
      }
    );

    return (
      <div>
      <h1> {this.props.state.surveyTitle} </h1>
      <form onSubmit={this.submitForm}>
      <div> { surveyQuestions } </div>
      <input type="submit" value="Submit" onClick={this.submitForm}/>
      </form>
      </div>
    );
  }
}

// TakeDisplay.propTypes = {};

export default TakeDisplay;
