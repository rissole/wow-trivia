import React, { PropTypes } from 'react';

import QuestionManager from '../assets/questions/QuestionManager';

import './QuizInput.scss';

const AnswerInput = ({ currentQuestionSet, currentQuestionNumber }) => {
  return (<div>
    <div className="question">
      {QuestionManager.getQuestion(currentQuestionSet, currentQuestionNumber)}
    </div>
    <div className="quiz-answer-input__answer">
      Thanks for selecting question set '{currentQuestionSet}'!
    </div>
  </div>);
};

AnswerInput.propTypes = {
  currentQuestionSet: PropTypes.string.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired
};

export default AnswerInput;
