'use strict';

import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChoice: 'Boolean'
    }

    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleRadioChange(event) {
    this.props.setQuestionType(event.target.value);
    this.setState({
      selectedChoice: event.target.value
    })
  }

  clear() {
    this.refs.theQuestion.value = '';
  }

  render() {
    return (
      <div>
      Question {this.props.state.allQuestions.length + 1}
      <br />
      <input
      ref="theQuestion"
      type="text"
      placeholder="What's your question?"
      onChange={this.props.setNewQuestion}
      />
      <br />

      <input id="boolean" type="radio" value="Boolean" onChange={this.handleRadioChange} checked={this.state.selectedChoice === 'Boolean'}/> Boolean
      <input id="multiple" type="radio" value="Multiple" onChange={this.handleRadioChange} checked={this.state.selectedChoice === 'Multiple'}/> Multiple Choice

      </div>
    );
  }
}

Question.defaultProps = {
  setQuestionType: React.PropTypes.func.isRequired,
  setNewQuestion: React.PropTypes.func.isRequired
};

export default Question;
