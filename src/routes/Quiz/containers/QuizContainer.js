import { connect } from 'react-redux';
import { setQuestionSet, setPlayerName } from '../modules/quiz';

import Quiz from '../components/Quiz';

const mapDispatchToProps = {
  setQuestionSet,
  setPlayerName
};

const mapStateToProps = (state) => ({
  currentQuestionSet : state.quiz.currentQuestionSet,
  currentPlayer: state.quiz.currentPlayer,
  currentQuestionNumber: state.game.currentQuestionNumber
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
