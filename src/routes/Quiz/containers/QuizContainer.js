import { connect } from 'react-redux';
import { setQuestionSet } from '../modules/quiz';

import Quiz from '../components/Quiz';

const mapDispatchToProps = {
  setQuestionSet
};

const mapStateToProps = (state) => ({
  currentQuestionSet : state.quiz.currentQuestionSet
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
