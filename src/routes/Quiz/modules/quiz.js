import Immutable from 'seamless-immutable';
import QuestionManager from '../assets/questions/QuestionManager';

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
      setTimeout(() => {
        dispatch({
          type    : ASYNC_QUIZ_SET_PLAYER_ANSWER.SUCCESS,
          payload : {
            value,
            isCorrect: QuestionManager.isCorrect(currentQuestionSet, currentQuestionIndex, value),
            correctAnswer: QuestionManager.getAnswers(currentQuestionSet, currentQuestionIndex)[0]
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
        correctAnswer: null
      }
    });
  },
  [ASYNC_QUIZ_SET_PLAYER_ANSWER.SUCCESS]: (state, action) => {
    return Immutable.merge(state, {
      playerAnswer: {
        isFetching: false,
        hasFetched: true,
        isCorrect: action.payload.isCorrect,
        correctAnswer: action.payload.correctAnswer
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
    correctAnswer: null,
    isFetching: false,
    hasFetched: false
  }
});
export default function quizReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
