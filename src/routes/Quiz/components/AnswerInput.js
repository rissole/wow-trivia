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
      <form className="quiz-answer-input__answer">
        <div className="form-group">
          <input className="form-control" autoFocus onChange={this._playerAnswerOnChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-default" type="submit">Submit</button>
        </div>
      </form>
    </div>);
  }
}

AnswerInput.propTypes = {
  currentQuestionSet: PropTypes.string.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
  setPlayerAnswer: PropTypes.func.isRequired
};

export default AnswerInput;
