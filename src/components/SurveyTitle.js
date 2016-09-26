'use strict';

import React from 'react';

class SurveyTitle extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div>
      Name Your Survey: <br></br>
      <input
        type="text"
        ref="question"
        onChange={this.props.setSurveyTitle}
        placeholder="Title of Your Survey"
      />
      </div>
    );
  }
}

SurveyTitle.propTypes = {
  setSurveyTitle: React.PropTypes.func.isRequired
};

export default SurveyTitle;
