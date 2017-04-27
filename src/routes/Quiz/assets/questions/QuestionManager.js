import timeless from './timeless.json';

const QUESTION_SETS = {
  timeless
};

const QuestionManager = {
  getSets: () => Object.keys(QUESTION_SETS),
  getTitle: (set) => QUESTION_SETS[set].Title,
  getTotalQuestions: (set) => QUESTION_SETS[set].Question.length,
  getQuestion: (set, questionIndex) => QUESTION_SETS[set].Question[questionIndex],
  getAnswers: (set, questionIndex) => QUESTION_SETS[set].Answers[questionIndex],
  isCorrect: (set, questionIndex, answer) => {
    return QUESTION_SETS[set].Answers[questionIndex].some((correct) => answer.toLowerCase() === correct.toLowerCase());
  }
};

export default QuestionManager;
