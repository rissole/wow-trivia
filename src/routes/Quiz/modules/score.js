import Immutable from 'seamless-immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const SCORE_PLAYER_ADD = 'SCORE_PLAYER_ADD';

// ------------------------------------
// Actions
// ------------------------------------
export function addPlayer(value = Immutable({ name: null, score: 0 })) {
  return {
    type: SCORE_PLAYER_ADD,
    payload: value
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SCORE_PLAYER_ADD]: (state, action) => {
    return Immutable.setIn(state, [action.payload.name], action.payload);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable({});
export default function playerReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
