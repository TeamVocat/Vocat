import React, { useEffect, useState } from "react";
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
var qs = require('qs');

async function review(user) {
  //get words that finished
  user.reviewToday = [];
  if (user.wordBank.length > 0) {
    while (user.wordBank[0].cooldown <= 0) {
      console.log(`should review ${user.wordBank[0].word}, whose cd is ${user.wordBank[0].cooldown}`);
      const newWord = user.wordBank[0];
      newWord.answers = await generateAnswers(newWord.word);
      user.reviewToday.push(newWord);
      user.wordBank = user.wordBank.slice(1);
      if (user.wordBank.length <= 0) {
        break;
      }
    }
  }
  console.log(user.reviewToday);
}

async function generateAnswers(word) {
  const user = await getUserLocal();
  const answers = [];
  for (let i = 0; i < 4; i++) {
    let result = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`, { wordBank: user.wordBank });
    while (result.data.word.word == word) {
      result = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab/`, { wordBank: user.wordBank });
    }
    answers.push(new Answer(result.data.word.word, false));
  }
  const currectIndex = Math.floor(Math.random() * 4);
  answers[currectIndex] = new Answer(word, true);
  return answers;
}

function getStyle(button, state, answer) {
  if (state == button) {
    return "#bfbfbf";
  }
  else if (state == button + 4) {
    return answer.correct ? "#c7fcb8" : "#ff5252";
  }
  else if (state > 3 && answer.correct) {
    return "#c7fcb8";
  }
  else {
    return "#f0f0f0";
  }
}

async function learnNew() {  //from db into user wordbank
  const user = await getUserLocal();
  console.log(user.wordBank);
  const newWords = [];
  for (let i = 0; i < user.wordsPerDay; i++) {
    const result = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`, { wordBank: user.wordBank });
    const newWord = new UserWord(result.data.word.word, result.data.word.definition, result.data.word.part_of_speech, result.data.word.example);
    newWords.push(newWord);
  }
  user.wordsToday = newWords;
  await storeUserLocal(user);
  return newWords;
};

class Answer {
  constructor(word, correct) {  //create when user learns this word
    this.word = word;
    this.correct = correct;
  }
}

class UserWord {
  constructor(word, definition, part_of_speech, example) {  //create when user learns this word
    this.word = word;
    this.definition = definition;
    this.part_of_speech = part_of_speech;
    this.example = example;
    this.cooldown = 0;
    this.answers = [];
  }
  review(correct) {  //boolean value
    if (correct) {
      this.cooldown = 14;
    }
    else {
      this.cooldown = 3;
    }
    return this;  //returns the word to be put back in queue
  }
}

class Progress {
  constructor(date, numWords) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const dateNum = ("0" + date.getDate()).slice(-2);
    this.dateString = `${month}/${dateNum}`;
    this.numWords = numWords;
  }

}


function compare(dateString, date) {
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const dateNum = ("0" + date.getDate()).slice(-2);
  return (dateString == `${month}/${dateNum}`);
}

async function addWordtoBank(word, user) {
  if (!user.wordBank[0]) {
    console.log('initializing wordBank');
    user.wordBank = [word];
  }
  else {
    let bank = user.wordBank;
    for (let j = 0; j < bank.length; j++) {
      if (bank[j].cooldown > word.cooldown) {
        bank.splice(j, 0, word);
        return;
      }
    }
    bank.push(word);
    user.wordBank = bank;
  }
  console.log(`added ${word.word} to bank`);
}

async function updateWordsPerDay(newNumber) {
  const user = await getUserLocal();
  user.wordsPerDay = newNumber;
  await storeUserLocal(user);
}

async function storeUserLocal(user) {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    console.log(error);
  }
}

async function getUserLocal() {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
}

async function clearUserLocal() {
  try {
    const jsonValue = JSON.stringify({});
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    console.log(error);
  }
}

async function storeSettings(settings) {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem('settings', jsonValue);
  } catch (error) {
    console.log(error);
  }
}

async function getSettings() {
  try {
    const jsonValue = await AsyncStorage.getItem('settings');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
}

export {
  storeSettings, getSettings, storeUserLocal, getUserLocal, clearUserLocal,
  review, learnNew, getStyle, addWordtoBank, generateAnswers, Progress, compare, updateWordsPerDay
};
