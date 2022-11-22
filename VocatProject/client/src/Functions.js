import axios from 'react-native-axios';
import {REACT_APP_SERVER_HOSTNAME} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

let userCoins = 0;

async function review(){
  //get UserWordBank
  const wordbank = await retrieve();
  //get words that finished
  const reviewToday = [];
  let i = 0;
  while (/*wordbank.wordbank[0].cooldown <= 0*/i < 5){
    const newWord = wordbank.wordbank[i];
    newWord.answers = await generateAnswers(newWord.word);
    reviewToday.push(newWord);
    //wordbank.wordbank = wordbank.wordbank.slice(1);
    i++;
  }
  return reviewToday;
}

async function learnNew(newWords){
  for (let i = 0; i < 5; i++){
    const newWord = await grab(/*word,*/);
    newWord.answers = await generateAnswers(newWord.word);
    newWords.push(newWord);
  }
  await store(new UserWordBank(newWords));
  return newWords;
}

async function generateAnswers(word) {
  const answers = [];
  for (let i = 0; i < 4; i++) {
    let result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
    while (result.data.word.word == word) {
      result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
    }
    answers.push(new Answer(result.data.word.word, false));
  }
  const correctIndex = Math.floor(Math.random() * 4);
  answers[correctIndex] = new Answer(word, true);
  return answers;
}

async function grab(/*word,*/) {
  //from db into user wordbank
  const result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
  const newWord = new UserWord(
    result.data.word.word,
    result.data.word.definition,
    result.data.word.part_of_speech,
    result.data.word.example,
  );
  return newWord;
}

class Answer {
  constructor(word, correct) {
    //create when user learns this word
    this.word = word;
    this.correct = correct;
  }
}

class UserWord {
  constructor(word, definition, part_of_speech, example) {
    //create when user learns this word
    this.word = word;
    this.definition = definition;
    this.part_of_speech = part_of_speech;
    this.example = example;
    this.cooldown = 0;
    this.doneToday = false;
    this.answers = [];
  }

  review(correct) {  //boolean value
    if (correct) {
      this.cooldown = 14;
      this.cooldownToday = true;
      userCoins++;
    } else {
      this.cooldown = 3;
    }
    return this; //returns the word to be put back in queue
  }
}

class UserWordBank{

  constructor(wordbank){
    this.wordbank = wordbank;
    this.reviewToday = [];
  }

  updateCD() {
    for (let i = 0; i < this.wordbank.length; i++) {
      this.wordbank[i].cooldown--;
    }
  }

  //insert a userWord once the user learns it (priority queue according to cd)
  add(word) {
    if (this.wordbank.length == 0) {
      this.wordbank.push(word);
    } else {
      for (let i = 0; i < this.wordbank.length; i++) {
        if (this.wordbank[i].cooldown > word.cooldown) {
          this.wordbank.splice(i, 0, word);
          return;
        }
      }
      this.wordbank.push(word);
    }
  }
}

async function store(wordbank) {
  console.log('storing');
  try {
    const jsonValue = JSON.stringify(wordbank);
    await AsyncStorage.setItem('wordbank', jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
}

async function retrieve() {
  try {
    const jsonValue = await AsyncStorage.getItem('wordbank');
    //console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export {review, learnNew, grab, userCoins, retrieve, UserWordBank};
