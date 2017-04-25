import React, { PureComponent, PropTypes } from 'react';

import QuestionManager from '../assets/questions/QuestionManager';

import './QuizInput.scss';

class AnswerInput extends PureComponent {
  constructor() {
    super();
    this._playerAnswerOnChange = this._playerAnswerOnChange.bind(this);
  }

  _playerAnswerOnChange(event) {
    this.props.setPlayerAnswer(event.target.value);
  }

  render() {
    const { currentQuestionSet, currentQuestionNumber } = this.props;

    return (<div>
      <div className="question">
        {QuestionManager.getQuestion(currentQuestionSet, currentQuestionNumber)}
      </div>
      <div className="quiz-answer-input__answer">
        <input autoFocus onChange={this._playerAnswerOnChange} />
      </div>
    </div>);
  }
}

AnswerInput.propTypes = {
  currentQuestionSet: PropTypes.string.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
  setPlayerAnswer: PropTypes.func.isRequired
};

export default AnswerInput;
