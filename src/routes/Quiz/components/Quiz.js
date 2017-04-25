import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RoomCreateInput from './RoomCreateInput';
import AnswerInput from './AnswerInput';

import './Quiz.scss';

export default class Quiz extends PureComponent {

  render() {
    const { currentQuestionSet } = this.props;

    return (
      <div style={{ margin: '0 auto' }}>
        <h1>World of Warcraft Trivia</h1>
        <div className="question">
          Select a question set
        </div>
        <div className="quiz__input">
          { currentQuestionSet === null ? <RoomCreateInput
            setQuestionSet={this.props.setQuestionSet}
            setPlayerName={this.props.setPlayerName}
          />
            : <AnswerInput currentQuestionSet={currentQuestionSet} />
          }
        </div>
      </div>
    );
  }

}

Quiz.propTypes = {
  setQuestionSet: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired,
  currentQuestionSet: PropTypes.string,
  currentPlayer: PropTypes.string
};
