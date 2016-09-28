require('normalize.css/normalize.css');

import React from 'react';

import Question from './Question';
import Response from './Response';
import SurveyTitle from './SurveyTitle';
import TakeDisplay from './TakeDisplay';
import ResultDisplay from './ResultDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyTitle: undefined,
      questionType: 'Boolean',
      newQuestion: '',
      resp1: '',
      resp2: '',
      resp3: '',
      resp4: '',
      allQuestions: [],
      mode: 'add',
      results: []
    }

    //function bindings
    this.setSurveyTitle = this.setSurveyTitle.bind(this);
    this.setNewQuestion = this.setNewQuestion.bind(this);
    this.setQuestionType = this.setQuestionType.bind(this);
    this.setResponse = this.setResponse.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.clear = this.clear.bind(this);
    this.takeAddToggle = this.takeAddToggle.bind(this);
    this.saveSurveyResult = this.saveSurveyResult.bind(this);
    this.resultTakeToggle = this.resultTakeToggle.bind(this);

    this.testButton = this.testButton.bind(this);
  }

  testButton() {
    this.setState({
      surveyTitle: 'Random Food Questions',
      allQuestions: [
      {
        actualQuestion: 'What is your favorite noodle dish?',
        questionType: 'Multiple',
        resp1: 'Naengmyun',
        resp2: 'Ramen',
        resp3: 'Chow Mein',
        resp4: 'Pho',
        questionNumber: 1
      }, {
        actualQuestion: 'What is your favorite food?',
        questionType: 'Multiple',
        resp1: 'Sushi',
        resp2: 'Bibimbap',
        resp3: 'Fried Chicken',
        resp4: 'Ramen',
        questionNumber: 2
      }, {
        actualQuestion: 'Do you prefer Steak or Chicken?',
        questionType: 'Boolean',
        resp1: 'Steak',
        resp2: 'Chicken',
        questionNumber: 3
      }, {
        actualQuestion: 'Do you prefer McDonalds or Burger King?',
        questionType: 'Boolean',
        resp1: 'McDonalds',
        resp2: 'Burger King',
        questionNumber: 4
      }, {
        actualQuestion: 'Do you prefer KFC or Popeyes?',
        questionType: 'Boolean',
        resp1: 'KFC',
        resp2: 'Popeyes',
        questionNumber: 5
      }]
    });
    console.log(this.state);
  }

  setSurveyTitle(event) {
    this.setState({
      surveyTitle: event.target.value
    });
  }

  setNewQuestion(event) {
    this.setState({
      newQuestion: event.target.value
    });
  }

  setQuestionType(value) {
    this.setState({
      questionType: value
    });
  }

  setResponse(num, resp) {
    var tempState = Object.assign({}, this.state);
    tempState['resp' + num] = resp;
    this.setState(tempState);
  }

  addQuestion() {
    var question = {};
    if (this.state.questionType === 'Boolean' ){
      question = {
        actualQuestion: this.state.newQuestion,
        questionType: this.state.questionType,
        resp1: this.state.resp1,
        resp2: this.state.resp2,
        questionNumber: this.state.allQuestions.length + 1
      }
    }
    if (this.state.questionType === 'Multiple' ){
      question = {
        actualQuestion: this.state.newQuestion,
        questionType: this.state.questionType,
        resp1: this.state.resp1,
        resp2: this.state.resp2,
        resp3: this.state.resp3,
        resp4: this.state.resp4,
        questionNumber: this.state.allQuestions.length + 1
      }
    }

    var tempAllQuestions = this.state.allQuestions.slice(0);
    tempAllQuestions.push(question);

    this.setState({
      allQuestions: tempAllQuestions,
      newQuestion: '',
      resp1: '',
      resp2: '',
      resp3: '',
      resp4: ''
    });

    this.clear();

  }

  clear() {
    this.refs.question.clear();
    this.refs.res.clear();
  }

  takeAddToggle() {
    if(this.state.mode === 'add') {
      this.setState({
        mode: 'take'
      });
    }
    if(this.state.mode === 'take') {
      this.setState({
        mode: 'add'
      });
    }
  }

  saveSurveyResult(result) {
    var tempState = this.state.results.slice(0);
    tempState.push(result);
    this.setState({
      results: tempState
    });
  }

  resultTakeToggle() {
    if(this.state.mode === 'take') {
      this.setState({
        mode:'result'
      });
    }
    if(this.state.mode === 'result') {
      this.setState({
        mode:'take'
      });
    }
  }


  render() {

    var currentDisplay = (<div></div>);
    var submitButton = (<div></div>);
    var takeButton = (<div></div>);
    var quickPreview = (<div></div>);
    var iphonePreview = (<div></div>);

    if (this.state.questionType !== undefined) {
      submitButton = (
        <div> <input type="submit" value="Add This Question to the Survey!" onClick={this.addQuestion} /> </div>
      )
    }

    if (this.state.allQuestions.length > 0) {
      takeButton = (
        <div> <input type="submit" value="Take The Survey" onClick={this.takeAddToggle} /> </div>
      )

      var questionsList = this.state.allQuestions.map(function(elem, i){
        return <li key={i}> { elem.actualQuestion } </li>
      })

      iphonePreview = this.state.allQuestions.map(
        function(elem, i) {
          if(elem.questionType === 'Boolean') {
            var ans = elem.resp2;
            var choices = (
              <div>
              <p id="choices"> { '1.' + elem.resp1 } </p>
              <p id="choices"> { '2.' + elem.resp2 } </p>
              </div>
            )
          }
          if(elem.questionType === 'Multiple') {
            var ans = elem.resp4;
            var choices = (
              <div>
              <p id="choices"> { '1.' + elem.resp1 } </p>
              <p id="choices"> { '2.' + elem.resp2 } </p>
              <p id="choices"> { '3.' + elem.resp3 } </p>
              <p id="choices"> { '4.' + elem.resp4 } </p>
              </div>
            )
          }
          return (
            <div key={i}>
              <p id="question"> { 'Question ' + elem.questionNumber + '. ' + elem.actualQuestion } </p>
              { choices }
              <p id="answer"> { ans } </p>
            </div>
          )
        }
      )

      quickPreview = (
        <div>
        <div> Created Questions: </div>
        <div> <ol> { questionsList } </ol> </div>
        </div>
      )
    }

    if (this.state.mode === 'add') {
      currentDisplay = (
        <div>
        <div id="leftPanel" >
        <h1>Create Your Own Survey</h1>
        
        <br />
        <br />


        <SurveyTitle
          setSurveyTitle={this.setSurveyTitle}
        />
        <br />
        <br />

        <Question
          ref="question"
          state={this.state}
          setNewQuestion={this.setNewQuestion}
          setQuestionType={this.setQuestionType}
        />

        <br />
        <br />
        <br />

        <Response
          ref="res"
          state={this.state}
          setResponse={this.setResponse}
        />
        { submitButton }
        { takeButton }

        <br />
        { quickPreview }
        <br /> <br /> <br /> <br />
        <br />
        <input type="submit" value="TEST" onClick={this.testButton} />
        </div>


        <div id="rightPanel">
        <div>
        <img id="iphone" src="https://d3nj7353mvgauu.cloudfront.net/media/categories/iphone-6-6s-6-plus-6s-plus-1.png" alt="iphone"/>
        </div>

        <div id="surveyQuestions">
          { iphonePreview }

        </div>

        </div>
        </div>
      )
    } else if (this.state.mode === 'take') {
      currentDisplay = (
        <div>
        <h1> Survey Taking Mode </h1>
        <input type="submit" value="Add More Questions" onClick={this.takeAddToggle} />
        <input type="submit" value="View Results" onClick={this.resultTakeToggle} />
        <br />
        <hr />
        <TakeDisplay
          state={this.state}
          saveSurveyResult={this.saveSurveyResult}
        />
        </div>
      )
    } else if (this.state.mode === 'result') {
      currentDisplay = (
        <div>
        <h1> Result Viewing Mode </h1>
        <input type="submit" value="Take The Survey!" onClick={this.resultTakeToggle} />
        <br />
        <hr />
        <ResultDisplay
          state={this.state}
        />
        </div>
      )
    }

    return (
      <div>
        { currentDisplay }
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
