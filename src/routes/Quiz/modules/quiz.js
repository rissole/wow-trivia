import Immutable from 'seamless-immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_SET_QUESTION_SET = 'QUIZ_SET_QUESTION_SET';
export const QUIZ_SET_PLAYER_NAME = 'QUIZ_SET_PLAYER_NAME';
export const QUIZ_SET_PLAYER_ANSWER = 'QUIZ_SET_PLAYER_ANSWER';

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
  return {
    type: QUIZ_SET_PLAYER_ANSWER,
    payload: value
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
    return Immutable.setIn(state, ['currentPlayer'], action.payload);
  },
  [QUIZ_SET_PLAYER_ANSWER]: (state, action) => {
    return Immutable.setIn(state, ['currentPlayerAnswer'], action.payload);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable({
  currentQuestionSet: null,
  currentPlayer: null,
  currentPlayerAnswer: null
});
export default function quizReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
