import React, { PropTypes } from 'react';

const AnswerInput = ({ currentQuestionSet }) => {
  return (<div>
    Thanks for selecting question set '{currentQuestionSet}'!
  </div>);
};

AnswerInput.propTypes = {
  currentQuestionSet: PropTypes.string.isRequired
};

export default AnswerInput;
