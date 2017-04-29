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
  playerName: state.quiz.playerName,
  currentQuestionIndex: state.game.currentQuestionIndex,
  playerAnswer: state.quiz.playerAnswer
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
