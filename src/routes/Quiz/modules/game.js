import Immutable from 'seamless-immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const GAME_PLAYER_ADD = 'SCORE_PLAYER_ADD';
export const GAME_SET_QUESTION = 'GAME_SET_QUESTION';

// ------------------------------------
// Actions
// ------------------------------------
export function addPlayer(value = Immutable({ name: null, score: 0 })) {
  return {
    type: GAME_PLAYER_ADD,
    payload: value
  };
}

export function setQuestionNumber(value = null) {
  return {
    type: GAME_SET_QUESTION,
    payload: value
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GAME_PLAYER_ADD]: (state, action) => {
    return Immutable.setIn(state, [action.payload.name], action.payload);
  },
  [GAME_SET_QUESTION]: (state, action) => {
    return Immutable.setIn(state, ['currentQuestionNumber'], action.payload);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable({
  scores: {},
  currentQuestionNumber: 0
});
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
