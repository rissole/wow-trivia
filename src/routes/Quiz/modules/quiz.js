import Immutable from 'seamless-immutable';
import QuestionManager from './QuestionManager';

const asyncAction = (actionType) => ({ REQUEST: `${actionType}_REQUEST`, SUCCESS: `${actionType}_SUCCESS` });

// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_SET_QUESTION_SET = 'QUIZ_SET_QUESTION_SET';
export const QUIZ_SET_PLAYER_NAME = 'QUIZ_SET_PLAYER_NAME';
export const ASYNC_QUIZ_SET_PLAYER_ANSWER = asyncAction('QUIZ_SET_PLAYER_ANSWER');

// ------------------------------------
// Actions
// ------------------------------------
export function setQuestionSet(value = null) {
  return {
    type: QUIZ_SET_QUESTION_SET,
    payload: value
  };
}

export function setPlayerName(value = null) {
  return {
    type: QUIZ_SET_PLAYER_NAME,
    payload: value
  };
}

export function setPlayerAnswer(value = null) {
  return (dispatch, getState) => {
    const currentQuestionSet = getState().quiz.currentQuestionSet;
    const currentQuestionIndex = getState().game.currentQuestionIndex;

    dispatch({
      type: ASYNC_QUIZ_SET_PLAYER_ANSWER.REQUEST,
      payload: value
    });
    return new Promise((resolve) => {
      const answerIndex = QuestionManager.getIndexForAnswer(currentQuestionSet, currentQuestionIndex, value);
      const correctAnswers = QuestionManager.getAnswers(currentQuestionSet, currentQuestionIndex);

      // one day this will be a fetch to the server to get answers.
      setTimeout(() => {
        dispatch({
          type    : ASYNC_QUIZ_SET_PLAYER_ANSWER.SUCCESS,
          payload : {
            value,
            isCorrect: answerIndex !== -1,
            correctAnswers: correctAnswers.filter((_, i) => i !== answerIndex)
          }
        });
        resolve();
      }, 500);
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUIZ_SET_QUESTION_SET]: (state, action) => {
    return Immutable.setIn(state, ['currentQuestionSet'], action.payload);
  },
  [QUIZ_SET_PLAYER_NAME]: (state, action) => {
    return Immutable.setIn(state, ['playerName'], action.payload);
  },
  [ASYNC_QUIZ_SET_PLAYER_ANSWER.REQUEST]: (state, action) => {
    return Immutable.merge(state, {
      playerAnswer: {
        value: action.payload,
        isFetching: true,
        hasFetched: false,
        isCorrect: null,
        correctAnswers: null
      }
    });
  },
  [ASYNC_QUIZ_SET_PLAYER_ANSWER.SUCCESS]: (state, action) => {
    return Immutable.merge(state, {
      playerAnswer: {
        isFetching: false,
        hasFetched: true,
        isCorrect: action.payload.isCorrect,
        correctAnswers: action.payload.correctAnswers
      }
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable({
  currentQuestionSet: null,
  playerName: null,
  playerAnswer: {
    value: null,
    isCorrect: null,
    correctAnswers: null,
    isFetching: false,
    hasFetched: false
  }
});
export default function quizReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
