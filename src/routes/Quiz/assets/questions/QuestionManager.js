import timeless from './timeless.json';

const QUESTION_SETS = {
  timeless
};

const QuestionManager = {
  getSets: () => Object.keys(QUESTION_SETS),
  getTitle: (set) => QUESTION_SETS[set].Title,
  getTotalQuestions: (set) => QUESTION_SETS[set].Question.length,
  getQuestion: (set, questionNumber) => QUESTION_SETS[set].Question[questionNumber]
};

export default QuestionManager;
