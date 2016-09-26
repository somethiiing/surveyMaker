'use strict';

import React from 'react';

class PreviewDisplay extends React.Component {
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
  }

  handleRadioChange(event) {
    var questionNum = event.target.id[0];
    var tempState = Object.assign({}, this.state);
    tempState['q'+questionNum+'Selection'] = event.target.id.slice(1);
    this.setState(tempState);
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
            <form>
              <input
              id={i + 'resp1'}
              type='radio'
              value={indQuestion.response1}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp1'} /> { indQuestion.response1 }
              <br />
              <input
              id={i + 'resp2'}
              type='radio'
              value={indQuestion.response2}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp2'} /> { indQuestion.response2 }
            </form>
            </div>
          )
        }
        if (indQuestion.questionType === 'Multiple') {
          return (
            <div key={i}>
            {indQuestion.questionNumber + '. ' + indQuestion.actualQuestion}
            <br />
            <form>
              <input
              id={i + 'resp1'}
              type='radio'
              value={indQuestion.response1}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp1'} /> { indQuestion.response1 }
              <br />
              <input
              id={i + 'resp2'}
              type='radio'
              value={indQuestion.response2}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp2'} /> { indQuestion.response2 }
              <br />
              <input
              id={i + 'resp3'}
              type='radio'
              value={indQuestion.response3}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp3'} /> { indQuestion.response3 }
              <br />
              <input
              id={i + 'resp4'}
              type='radio'
              value={indQuestion.response4}
              onChange={that.handleRadioChange}
              checked={that.state['q'+i+'Selection'] === 'resp4'} /> { indQuestion.response4 }
            </form>
            </div>
          )
        }
      }
    );

    return (
      <div>
      <h1> {this.props.state.surveyTitle} </h1>
      <div> { surveyQuestions } </div>
      </div>
    );
  }
}

// PreviewDisplay.propTypes = {};

export default PreviewDisplay;
