import { connect } from 'react-redux';
import { setQuestionSet, setPlayerName, setPlayerAnswer } from '../modules/quiz';

import Quiz from '../components/Quiz';

const mapDispatchToProps = {
  setQuestionSet,
  setPlayerName,
  setPlayerAnswer
};

const mapStateToProps = (state) => ({
  currentQuestionSet : state.quiz.currentQuestionSet,
  currentPlayer: state.quiz.currentPlayer,
  currentQuestionNumber: state.game.currentQuestionNumber,
  playerAnswer: state.quiz.playerAnswer.value,
  hasSubmittedAnswer: (!state.quiz.playerAnswer.isFetching && state.quiz.playerAnswer.hasFetched)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
