'use strict';

import React from 'react';


class Response extends React.Component {
  constructor(props) {
    super(props);

    this.handleOption1Change = this.handleOption1Change.bind(this);
    this.handleOption2Change = this.handleOption2Change.bind(this);
    this.handleOption3Change = this.handleOption3Change.bind(this);
    this.handleOption4Change = this.handleOption4Change.bind(this);
  }

  handleOption1Change (event) {
    this.props.setResponse(1, event.target.value);
  }

  handleOption2Change (event) {
    this.props.setResponse(2, event.target.value);
  }

  handleOption3Change (event) {
    this.props.setResponse(3, event.target.value);
  }

  handleOption4Change (event) {
    this.props.setResponse(4, event.target.value);
  }

  clear() {
    this.refs.opt1.value = '';
    this.refs.opt2.value = '';
    if(this.refs.opt3 !== undefined){
      this.refs.opt3.value = '';
      this.refs.opt4.value = '';
    }
  }

  render() {

    var responseLayout;

    if (this.props.state.questionType === 'Boolean') {
      responseLayout = (
        <div>
          1. <input type="text" ref="opt1" placeholder="Yes" onChange={this.handleOption1Change} /> <br />
          2. <input type="text" ref="opt2" placeholder="No"  onChange={this.handleOption2Change} />
        </div>
      )
    }

    if (this.props.state.questionType === 'Multiple') {
      responseLayout = (
        <div>
          1. <input type="text" ref="opt1" placeholder="Option 1" onChange={this.handleOption1Change}/> <br />
          2. <input type="text" ref="opt2" placeholder="Option 2" onChange={this.handleOption2Change}/> <br />
          3. <input type="text" ref="opt3" placeholder="Option 3" onChange={this.handleOption3Change}/> <br />
          4. <input type="text" ref="opt4" placeholder="Option 4" onChange={this.handleOption4Change}/> <br />
        </div>
      )
    }

    return (
      <div>
        {responseLayout}
      </div>
    );
  }
}

Response.displayName = 'Response';

Response.propTypes = {
  setResponse: React.PropTypes.func.isRequired
};

export default Response;
