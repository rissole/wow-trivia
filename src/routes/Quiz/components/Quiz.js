import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { questionSets } from '../assets/questions';

export default class Quiz extends PureComponent {
  render() {
    const { counter, doubleAsync, increment } = this.props;

    return (
      <div style={{ margin: '0 auto' }}>
        <h1>World of Warcraft Trivia</h1>
        <div className="instructions">
          Select a question set
        </div>
        <button className="btn btn-default" onClick={increment}>
          Increment
        </button>
        {' '}
        <button className="btn btn-default" onClick={doubleAsync}>
          Double (Async)
        </button>
      </div>
    );
  }
}

Quiz.propTypes = {
  counter: PropTypes.number.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired
};
