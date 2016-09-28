'use strict';

import React from 'react';

class ResultDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'all'
    }

    this.toggleView = this.toggleView.bind(this);

  }

  toggleView(){
    if(this.state.display === 'all'){
      this.setState({ display: 'individual' });
    }
    if(this.state.display === 'individual') {
      this.setState({ display: 'all' });
    }
  }

  render() {

    var that = this;
    var results = this.props.state.results;
    var viewToggle = (<div></div>);
    var resultsDisplay = (<div></div>);

    if(this.state.display === 'all') {

      var resultsObj = {};
      var resultsArray = [];

      for(var i = 0; i < this.props.state.allQuestions.length; i++) {
        resultsObj['q'+i+'Selection'] = {};
      }

      for(var i = 0; i < results.length; i++) {
        for(var key in results[i]) {
          if(resultsObj[key][results[i][key]] === undefined) {
            resultsObj[key][results[i][key]] = 1;
          } else {
            resultsObj[key][results[i][key]]++;
          }
        }
      }

      for(var key in resultsObj) {
        resultsArray.push(resultsObj[key]);
      }

      for(var i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].resp1 === undefined) {
          resultsArray[i].resp1 = 0;
        }
        if (resultsArray[i].resp2 === undefined) {
          resultsArray[i].resp2 = 0;
        }
        if (resultsArray[i].resp3 === undefined) {
          resultsArray[i].resp3 = 0;
        }
        if (resultsArray[i].resp4 === undefined) {
          resultsArray[i].resp4 = 0;
        }
      }

      viewToggle = (
        <div>
        <h2>Viewing All Results</h2>
        <input type="submit" value="View Individual Results" onClick={this.toggleView} />
        <br />
        <br />
        <div> Out of {this.props.state.results.length} surveys taken: </div>
        </div>
      );

      resultsDisplay = resultsArray.map(
        function(result, i) {

          if(that.props.state.allQuestions[i].resp3 === undefined) {
            var resp3div = (<div></div>);
          } else {
            var resp3div = (<div>{ that.props.state.allQuestions[i].resp3 + ': '} {result.resp3}</div>)
          }

          if(that.props.state.allQuestions[i].resp4 === undefined) {
            var resp4div = (<div></div>);
          } else {
            var resp4div = (<div>{ that.props.state.allQuestions[i].resp4 + ': '} {result.resp4}</div>)
          }

          return (
            <div key={i}>
              <div>{ 'Question ' + (i + 1) + '. '} {that.props.state.allQuestions[i].actualQuestion}</div>
              <div>{ that.props.state.allQuestions[i].resp1 + ': '} {result.resp1}</div>
              <div>{ that.props.state.allQuestions[i].resp2 + ': '} {result.resp2}</div>
              {resp3div}
              {resp4div}
              <br />
            </div>
          )
        }
      )


    }
    if(this.state.display === 'individual') {
      var indResultsArray = this.props.state.results.slice(0);
      for (var i = 0; i<indResultsArray.length; i++) {
        var temp = [];
        for (var key in indResultsArray[i]) {
          temp.push(indResultsArray[i][key])
        }
        indResultsArray[i] = temp;
      }

      resultsDisplay = indResultsArray.map(
        function(indResult, i) {
          return indResult.map(
            function(answer, j) {
              if(j === 0) {
                var personCounter = (<div id="indPerson">Person {i+1}:</div>)
              }
              if(j === indResult.length - 1) {
                var spacing = (<div><br /><hr /></div>)
              }

              return (
                <div>
                {personCounter}
                <div id="indQuestion">Question {j + 1}: {that.props.state.allQuestions[j].actualQuestion}</div>
                <div id="indResponse">>>>>>>>>> {that.props.state.allQuestions[j][answer]}</div>
                {spacing}
                </div>
              )
            }
          )
        }
      )

      viewToggle = (
        <div>
        <h2>Viewing Individual Results</h2>
        <input type="submit" value="View All Results" onClick={this.toggleView} />
        </div>
      );
    }


    return (
      <div>
        { viewToggle }
        <br />
        <hr />
        { resultsDisplay }
      </div>
    );
  }
}

// ResultDisplay.propTypes = {};

export default ResultDisplay;
