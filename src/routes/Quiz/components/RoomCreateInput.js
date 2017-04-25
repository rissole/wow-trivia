import React, { PropTypes } from 'react';
import QUESTION_SETS from '../assets/questions';

const QuestionSetInput = ({ setQuestionSet, setPlayerName }) => {
  const createQuestionSetClick = (set) => () => setQuestionSet(set);
  const playerNameOnChange = (event) => setPlayerName(event.target.value);

  return (<div>
    {false ? <div className="room-create-input__player-name">
      Player name: <input type="text" onChange={playerNameOnChange} placeholder="Salty Stef" />
    </div> : null}
    <div className="room-create-input__question-set">
      {Object.keys(QUESTION_SETS).map((set) => (
        <button key={set} onClick={createQuestionSetClick(set)}>{QUESTION_SETS[set].Title}</button>
      ))}
    </div>
  </div>);
};

QuestionSetInput.propTypes = {
  setQuestionSet: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired
};

export default QuestionSetInput;
