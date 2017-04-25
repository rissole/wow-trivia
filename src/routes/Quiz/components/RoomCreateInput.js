import React, { PropTypes } from 'react';
import QuestionManager from '../assets/questions/QuestionManager';

import './QuizInput.scss';

const QuestionSetInput = ({ setQuestionSet, setPlayerName }) => {
  const createQuestionSetClick = (set) => () => setQuestionSet(set);
  const playerNameOnChange = (event) => setPlayerName(event.target.value);

  return (
    <div>
      <div className="question">
        Select a question set
      </div>
      {false ? <div className="room-create-input__player-name">
        Player name: <input type="text" onChange={playerNameOnChange} placeholder="Salty Stef" />
      </div> : null}
      <div className="room-create-input__question-set">
        {QuestionManager.getSets().map((set) => (
          <button className="btn btn-default" key={set}
            onClick={createQuestionSetClick(set)}>{QuestionManager.getTitle(set)}</button>
        ))}
      </div>
    </div>);
};

QuestionSetInput.propTypes = {
  setQuestionSet: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired
};

export default QuestionSetInput;
