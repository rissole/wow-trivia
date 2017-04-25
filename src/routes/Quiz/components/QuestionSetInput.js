import React, { PropTypes } from 'react';
import QUESTION_SETS from '../assets/questions';

const QuestionSetInput = ({ setQuestionSet }) => {
  const generateQuestionSetClick = (set) => () => setQuestionSet(set);

  return (<div>
    {Object.keys(QUESTION_SETS).map((set) => (
      <button key={set} onClick={generateQuestionSetClick(set)}>{QUESTION_SETS[set].Title}</button>
    ))}
  </div>);
};

QuestionSetInput.propTypes = {
  setQuestionSet: PropTypes.func.isRequired
};

export default QuestionSetInput;
