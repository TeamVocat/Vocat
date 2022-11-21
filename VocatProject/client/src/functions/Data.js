let retrieveWord;
let retrieveDefinition;
  VocabWord.findOne({}).exec((err, word) => {
    retrieveWord = word.word;
    retrieveDefinition = word.definition;
  });

const currentWord = 'old word';
const Answers = ['Answer 5','Answer 6','Answer 7','Answer 8'];

const currentWordNew = 'new word';
const Definition = "word's definition";


export {currentWord, Answers, currentWordNew, Definition};