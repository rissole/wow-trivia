import timeless from '../assets/questions/timeless.json';

const QUESTION_SETS = {
  timeless
};

const QuestionManager = {
  getSets: () => Object.keys(QUESTION_SETS),
  getTitle: (set) => QUESTION_SETS[set].Title,
  getTotalQuestions: (set) => QUESTION_SETS[set].Question.length,
  getQuestion: (set, questionIndex) => QUESTION_SETS[set].Question[questionIndex],
  getAnswers: (set, questionIndex) => QUESTION_SETS[set].Answers[questionIndex],

  // each question has multiple valid answers
  getIndexForAnswer: (set, questionIndex, answer) => {
    const answers = QUESTION_SETS[set].Answers[questionIndex];
    return answers.findIndex((correct) => answer.toLowerCase() === correct.toLowerCase());
  }
};

export default QuestionManager;
