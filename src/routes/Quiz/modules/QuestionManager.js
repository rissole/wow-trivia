import timeless from '../assets/questions/timeless.json';
import aidenhall from '../assets/questions/aidenhall.json';
import cata1 from '../assets/questions/cata1.json';
import cata2 from '../assets/questions/cata2.json';

const QUESTION_SETS = {
  timeless,
  aidenhall,
  cata1,
  cata2
};

// I dream of a day when this is server side, and more than one
let ORDER;

const QuestionManager = {
  getSets: () => Object.keys(QUESTION_SETS),
  getTitle: (set) => QUESTION_SETS[set].Title,
  getNumberOfQuestions: (set) => QUESTION_SETS[set].Question.length,
  getQuestion: (set, questionIndex) => QUESTION_SETS[set].Question[questionIndex],
  getAnswers: (set, questionIndex) => QUESTION_SETS[set].Answers[questionIndex],

  // each question has multiple valid answers
  getIndexForAnswer: (set, questionIndex, answer) => {
    const answers = QUESTION_SETS[set].Answers[questionIndex];
    return answers.findIndex((correct) => answer.toLowerCase() === correct.toLowerCase());
  },

  createOrder: (set) => {
    ORDER = [...Array(QuestionManager.getNumberOfQuestions(set)).keys()];
  },
  pickNextQuestion: () => {
    if (ORDER.length === 0) {
      return -1;
    }
    const index = Math.floor(Math.random() * ORDER.length);
    return ORDER.splice(index, 1)[0];
  }
};

export default QuestionManager;
