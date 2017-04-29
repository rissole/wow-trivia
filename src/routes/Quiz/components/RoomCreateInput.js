import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import QuestionManager from '../modules/QuestionManager';

import './QuizInput.scss';

export default class QuestionSetInput extends PureComponent {
  constructor() {
    super();
    this._createQuestionSetClick = this._createQuestionSetClick.bind(this);
    this._playerNameOnChange = this._playerNameOnChange.bind(this);
  }

  _createQuestionSetClick(set) {
    return () => this.props.setQuestionSet(set);
  }

  _playerNameOnChange(event) {
    this.props.setPlayerName(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="question">
          Select a question set
        </div>
        {false ? <div className="room-create-input__player-name">
          Player name: <input type="text" onChange={this._playerNameOnChange} placeholder="Salty Stef" />
        </div> : null}
        <ul className="room-create-input__question-set">
          {QuestionManager.getSets().map((set) => (
            <li key={set}>
              <button
                className="btn btn-default"
                onClick={this._createQuestionSetClick(set)}
                style={{ width: 400 }}
              >
                {QuestionManager.getTitle(set)} ({QuestionManager.getNumberOfQuestions(set)} questions)
              </button>
            </li>
          ))}
        </ul>
      </div>);
  }
};

QuestionSetInput.propTypes = {
  setQuestionSet: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired
};
