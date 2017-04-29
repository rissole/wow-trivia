import Immutable from 'seamless-immutable';
import QuestionManager from './QuestionManager';

const asyncAction = (actionType) => ({ REQUEST: `${actionType}_REQUEST`, SUCCESS: `${actionType}_SUCCESS` });
const MOCK_ASYNC_DELAY = 3;

// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_SET_QUESTION_SET = 'QUIZ_SET_QUESTION_SET';
export const QUIZ_SET_PLAYER_NAME = 'QUIZ_SET_PLAYER_NAME';
export const ASYNC_QUIZ_SET_PLAYER_ANSWER = asyncAction('QUIZ_SET_PLAYER_ANSWER');
export const ASYNC_QUIZ_REQUEST_NEXT_QUESTION = asyncAction('QUIZ_REQUEST_NEXT_QUESTION');

// ------------------------------------
// Actions
// ------------------------------------
export function setQuestionSet(value = null) {
  return (dispatch, getState) => {
    dispatch({
      type: QUIZ_SET_QUESTION_SET,
      payload: value
    });

    return requestNextQuestion()(dispatch, getState);
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
    const currentQuestionIndex = getState().quiz.currentQuestionIndex;

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
      }, MOCK_ASYNC_DELAY);
    });
  };
}

export function requestNextQuestion() {
  return (dispatch, getState) => {
    dispatch({
      type: ASYNC_QUIZ_REQUEST_NEXT_QUESTION.REQUEST
    });

    return new Promise((resolve) => {
      // one day this will be a fetch to the server.
      setTimeout(() => {
        dispatch({
          type    : ASYNC_QUIZ_REQUEST_NEXT_QUESTION.SUCCESS,
          payload : {
            nextQuestionIndex: QuestionManager.pickNextQuestion()
          }
        });
        resolve();
      }, MOCK_ASYNC_DELAY);
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUIZ_SET_QUESTION_SET]: (state, action) => {
    const set = action.payload;

    QuestionManager.createOrder(set);
    return Immutable.merge(state, {
      currentQuestionSet: set,
      totalQuestions: QuestionManager.getNumberOfQuestions(set)
    });
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
      score: state.score + (action.payload.isCorrect ? 1 : 0),
      questionsCompleted: state.questionsCompleted + 1,
      playerAnswer: {
        isFetching: false,
        hasFetched: true,
        isCorrect: action.payload.isCorrect,
        correctAnswers: action.payload.correctAnswers
      }
    });
  },
  [ASYNC_QUIZ_REQUEST_NEXT_QUESTION.SUCCESS]: (state, action) => {
    return Immutable.merge(state, {
      currentQuestionIndex: action.payload.nextQuestionIndex,
      playerAnswer: INITIAL_PLAYER_ANSWER_STATE
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_PLAYER_ANSWER_STATE = {
  value: null,
  isCorrect: null,
  correctAnswers: null,
  isFetching: false,
  hasFetched: false
};
const initialState = Immutable({
  currentQuestionSet: null,
  currentQuestionIndex: null,
  playerName: null,
  score: 0,
  totalQuestions: null,
  questionsCompleted: 0,
  playerAnswer: INITIAL_PLAYER_ANSWER_STATE
});
export default function quizReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
