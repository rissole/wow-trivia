import { combineReducers } from 'redux';
import locationReducer from './location';
import quizReducer from '../routes/Quiz/modules/quiz';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    quiz: quizReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
