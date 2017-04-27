import React, { PureComponent, PropTypes } from 'react';

import QuestionManager from '../assets/questions/QuestionManager';

import './QuizInput.scss';

class AnswerInput extends PureComponent {
  constructor() {
    super();
    this._answerInputOnChange = this._answerInputOnChange.bind(this);
    this._submitAnswer = this._submitAnswer.bind(this);

    this.state = {
      currentAnswer: ''
    };
  }

  _answerInputOnChange(event) {
    this.setState({
      currentAnswer: event.target.value
    });
  }

  _submitAnswer(event) {
    event.preventDefault();
    this.props.setPlayerAnswer(this.state.currentAnswer);
  }

  render() {
    const { currentQuestionSet, currentQuestionIndex } = this.props;

    return (<div>
      <div className="question">
        {QuestionManager.getQuestion(currentQuestionSet, currentQuestionIndex)}
      </div>
      <form className="quiz-answer-input__answer">
        <div className="form-group">
          <input className="form-control" autoFocus onChange={this._answerInputOnChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-default" type="submit" onClick={this._submitAnswer}>Submit</button>
        </div>
      </form>
    </div>);
  }
}

AnswerInput.propTypes = {
  currentQuestionSet: PropTypes.string.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  setPlayerAnswer: PropTypes.func.isRequired
};

export default AnswerInput;
