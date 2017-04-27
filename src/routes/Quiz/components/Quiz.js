import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RoomCreateInput from './RoomCreateInput';
import AnswerInput from './AnswerInput';

export default class Quiz extends PureComponent {

  render() {
    const { currentQuestionSet, currentQuestionNumber } = this.props;

    return (
      <div style={{ margin: '0 auto' }}>
        <h1>World of Warcraft Trivia</h1>
        <div className="quiz__input">
          { currentQuestionSet === null ? <RoomCreateInput
            setQuestionSet={this.props.setQuestionSet}
            setPlayerName={this.props.setPlayerName}
          />
            : <AnswerInput
              currentQuestionSet={currentQuestionSet}
              currentQuestionNumber={currentQuestionNumber}
              setPlayerAnswer={this.props.setPlayerAnswer}
            />
          }
        </div>
      </div>
    );
  }

}

Quiz.propTypes = {
  setQuestionSet: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired,
  setPlayerAnswer: PropTypes.func.isRequired,

  currentQuestionSet: PropTypes.string,
  currentPlayer: PropTypes.string,
  currentQuestionNumber: PropTypes.number,
  playerAnswer: PropTypes.string,
  hasSubmittedAnswer: PropTypes.bool
};
