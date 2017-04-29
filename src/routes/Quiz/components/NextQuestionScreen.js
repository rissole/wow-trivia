import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

export default class NextQuestionScreen extends PureComponent {
  constructor() {
    super();
    this._clickNextQuestion = this._clickNextQuestion.bind(this);
    this._enterKeyPressed = this._enterKeyPressed.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this._enterKeyPressed);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this._enterKeyPressed);
  }

  _enterKeyPressed(event) {
    if (event.which === ENTER_KEY_CODE || event.which === SPACE_KEY_CODE) {
      document.body.removeEventListener('keydown', this._enterKeyPressed);
      this.props.requestNextQuestion();
    }
  }

  _clickNextQuestion(event) {
    event.preventDefault();
    this.props.requestNextQuestion();
  }

  _renderCorrectAnswers() {
    const { correctAnswers } = this.props.playerAnswer;

    return (<span>
      {
        correctAnswers.map((answer, i) => {
          return (<span key={i}><strong>{answer}</strong>{i === correctAnswers.length - 1 ? '.' : ', '}</span>);
        })
      }
    </span>);
  }

  _renderCorrectPanel() {
    const { correctAnswers } = this.props.playerAnswer;

    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          Correct!
        </div>
        <div className="panel-body">
          { correctAnswers.length === 0
            ? 'Good job!'
            : <div>We would've also accepted: { this._renderCorrectAnswers() }</div>
          }
        </div>
      </div>
    );
  }

  _renderIncorrectPanel() {
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          Incorrect!
        </div>
        <div className="panel-body">
          { this.props.playerAnswer.correctAnswers.length === 1
            ? <span>The answer was: {this._renderCorrectAnswers()}</span>
            : <span>We would've accepted any of the following: {this._renderCorrectAnswers()}</span>
          }
        </div>
      </div>
    );
  }

  render() {
    const { isCorrect, isFetching, hasFetched } = this.props.playerAnswer;

    if (!hasFetched && isFetching) {
      return <div>まだロードしてる…</div>;
    }

    return (<div>
      { isCorrect ? this._renderCorrectPanel() : this._renderIncorrectPanel() }
      <button
        className="btn btn-default"
        type="button"
        onClick={this._clickNextQuestion}
      >
        Next question
      </button>
    </div>);
  }
};

NextQuestionScreen.propTypes = {
  playerAnswer: PropTypes.shape({
    value: PropTypes.string,
    isCorrect: PropTypes.bool,
    correctAnswers: PropTypes.array,
    isFetching: PropTypes.bool,
    hasFetched: PropTypes.bool
  }),
  requestNextQuestion: PropTypes.func
};
