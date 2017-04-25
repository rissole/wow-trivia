import Immutable from 'seamless-immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_SET_QUESTION_SET = 'QUIZ_SET_QUESTION_SET';

// ------------------------------------
// Actions
// ------------------------------------
export function setQuestionSet(value = null) {
  return {
    type: QUIZ_SET_QUESTION_SET,
    payload: value
  };
}

export const actions = {
  setQuestionSet
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUIZ_SET_QUESTION_SET]: (state, action) => {
    return Immutable.setIn(state, ['currentQuestionSet'], action.payload);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable({
  currentQuestionSet: null
});
export default function quizReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
