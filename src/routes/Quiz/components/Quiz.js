import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RoomCreateInput from './RoomCreateInput';
import AnswerInput from './AnswerInput';
import NextQuestionScreen from './NextQuestionScreen';

const SCREENS = {
  ROOM_CREATE: 'ROOM_CREATE',
  ANSWER_INPUT: 'ANSWER_INPUT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  END_OF_THE_WORLD: 'END_OF_THE_WORLD'
};

export default class Quiz extends PureComponent {

  _getCurrentScreen() {
    const { currentQuestionSet, playerAnswer } = this.props;

    const hasSubmittedAnswer = (playerAnswer.value !== null);
    const isGameOver = false;

    if (currentQuestionSet === null) {
      return SCREENS.ROOM_CREATE;
    }
    if (isGameOver) {
      return SCREENS.END_OF_THE_WORLD;
    }
    if (!hasSubmittedAnswer) {
      return SCREENS.ANSWER_INPUT;
    }
    if (hasSubmittedAnswer) {
      return SCREENS.NEXT_QUESTION;
    }
    throw new Error("I DON'T KNOW WHAT SCREEN TO GO TO");
  }

  render() {
    const { currentQuestionSet, currentQuestionIndex, playerAnswer } = this.props;

    let screen;
    switch (this._getCurrentScreen()) {
      case SCREENS.ROOM_CREATE:
        screen = (<RoomCreateInput
          setQuestionSet={this.props.setQuestionSet}
          setPlayerName={this.props.setPlayerName}
        />);
        break;
      case SCREENS.ANSWER_INPUT:
        screen = (<AnswerInput
          currentQuestionSet={currentQuestionSet}
          currentQuestionIndex={currentQuestionIndex}
          setPlayerAnswer={this.props.setPlayerAnswer}
        />);
        break;
      case SCREENS.NEXT_QUESTION:
        screen = (<NextQuestionScreen playerAnswer={playerAnswer} />);
        break;
    }

    return (
      <div style={{ margin: '0 auto' }}>
        <h1>World of Warcraft Trivia</h1>
        <div className="quiz__input">
          { screen }
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
  playerName: PropTypes.string,
  currentQuestionIndex: PropTypes.number,
  playerAnswer: PropTypes.shape({
    value: PropTypes.string,
    isCorrect: PropTypes.bool,
    correctAnswers: PropTypes.array,
    isFetching: PropTypes.bool,
    hasFetched: PropTypes.bool
  })
};
