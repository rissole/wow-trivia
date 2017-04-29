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
    const { currentQuestionSet, currentQuestionIndex, playerAnswer } = this.props;

    const hasSubmittedAnswer = (playerAnswer.value !== null);
    const isGameOver = (currentQuestionIndex === -1);

    if (currentQuestionSet === null || currentQuestionIndex === null) {
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
    const { currentQuestionSet, currentQuestionIndex, playerAnswer, score, totalQuestions,
      questionsCompleted } = this.props;

    const currentScreen = this._getCurrentScreen();
    let screen;
    switch (currentScreen) {
      case SCREENS.ROOM_CREATE:
        screen = (<RoomCreateInput
          setQuestionSet={this.props.setQuestionSet}
          setPlayerName={this.props.setPlayerName}
          requestNextQuestion={this.props.requestNextQuestion}
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
        screen = (<NextQuestionScreen
          playerAnswer={playerAnswer}
          requestNextQuestion={this.props.requestNextQuestion}
        />);
        break;
      case SCREENS.END_OF_THE_WORLD:
        screen = (<div>This is the end of the game.</div>);
        break;
    }

    const shouldShowScoreHeader = [
      SCREENS.ANSWER_INPUT,
      SCREENS.NEXT_QUESTION,
      SCREENS.END_OF_THE_WORLD
    ].indexOf(currentScreen) !== -1;

    return (
      <div style={{ margin: '0 auto' }}>
        <h1>World of Warcraft Trivia</h1>
        { shouldShowScoreHeader
          ? <div className="quiz__score">Score: {score} ({questionsCompleted} / {totalQuestions})</div>
          : null }
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
  requestNextQuestion: PropTypes.func.isRequired,

  currentQuestionSet: PropTypes.string,
  currentQuestionIndex: PropTypes.number,
  playerName: PropTypes.string,
  score: PropTypes.number,
  totalQuestions: PropTypes.number,
  questionsCompleted: PropTypes.number,
  playerAnswer: PropTypes.shape({
    value: PropTypes.string,
    isCorrect: PropTypes.bool,
    correctAnswers: PropTypes.array,
    isFetching: PropTypes.bool,
    hasFetched: PropTypes.bool
  })
};
