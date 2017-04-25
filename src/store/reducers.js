import { combineReducers } from 'redux';
import locationReducer from './location';
import quizReducer from '../routes/Quiz/modules/quiz';
import scoreReducer from '../routes/Quiz/modules/score';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    quiz: quizReducer,
    score: scoreReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
