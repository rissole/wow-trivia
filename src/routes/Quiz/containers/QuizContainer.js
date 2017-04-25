import { connect } from 'react-redux';
import { increment, doubleAsync } from '../modules/quiz';

import Quiz from '../components/Quiz';

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
};

const mapStateToProps = (state) => ({
  counter : state.quiz
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
