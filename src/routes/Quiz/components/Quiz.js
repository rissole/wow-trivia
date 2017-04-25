import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QuestionSetInput from './QuestionSetInput';
import AnswerInput from './AnswerInput';

import './Quiz.scss';

export default class Quiz extends PureComponent {

  render() {
    const { currentQuestionSet } = this.props;

    return (
      <div style={{ margin: '0 auto' }}>
        <h1>World of Warcraft Trivia</h1>
        <div className="question">
          Select a question set
        </div>
        <div className="quiz__input">
          { currentQuestionSet === null ? <QuestionSetInput setQuestionSet={this.props.setQuestionSet} />
            : <AnswerInput currentQuestionSet={currentQuestionSet} />
          }
        </div>
      </div>
    );
  }

}

Quiz.propTypes = {
  setQuestionSet: PropTypes.func.isRequired,
  currentQuestionSet: PropTypes.string
};
