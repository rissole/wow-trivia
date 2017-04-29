import { connect } from 'react-redux';
import { setQuestionSet, setPlayerName, setPlayerAnswer, requestNextQuestion } from '../modules/quiz';

import Quiz from '../components/Quiz';

const mapDispatchToProps = {
  setQuestionSet,
  setPlayerName,
  setPlayerAnswer,
  requestNextQuestion
};

const mapStateToProps = (state) => ({
  currentQuestionSet : state.quiz.currentQuestionSet,
  currentQuestionIndex: state.quiz.currentQuestionIndex,
  playerName: state.quiz.playerName,
  playerAnswer: state.quiz.playerAnswer,
  score: state.quiz.score,
  totalQuestions: state.quiz.totalQuestions,
  questionsCompleted: state.quiz.questionsCompleted
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
