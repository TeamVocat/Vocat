import React, { useEffect, useState } from "react";
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function review() {
  //get UserWordBank
  const user = await getUserLocal();
  let wordbank = user.wordbank;
  //get words that finished
  const reviewToday = [];
  while (wordbank[0].cooldown <= 0) {
    const newWord = wordbank[0];
    newWord.answers = await generateAnswers(newWord.word);
    reviewToday.push(newWord);
    wordbank = wordbank.slice(1);
    if (wordbank.length <= 0) {
      break;
    }
  }
  return reviewToday;
}

async function generateAnswers(word) {
  const answers = [];
  for (let i = 0; i < 4; i++) {
    let result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
    while (result.data.word.word == word) {
      result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab/`);
    }
    answers.push(new Answer(result.data.word.word, false));
  }
  const correctIndex = Math.floor(Math.random() * 4);
  answers[correctIndex] = new Answer(word, true);
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
  const newWords = [];
  for (let i = 0; i < user.wordsPerDay; i++){
    const result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`, { params: { id: user._id, progress: /*user.wordBankProgress*/i } });
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
    this.doneToday = false;
    this.answers = [];
  }
  review(correct) {  //boolean value
    if (correct) {
      this.cooldown = 14;
      this.cooldownToday = true;
      userCoins++;
    }
    else {
      this.cooldown = 3;
    }
    return this;  //returns the word to be put back in queue
  }
}

async function addWordstoBank(words) {
  let user = await getUserLocal();
  if (user.wordbank == undefined || user.wordbank.length <= 0){
    console.log('initializing wordbank');
    user.wordbank = words;
  }
  else{
    let bank = user.wordbank;
    for (let i = 0; i < words.length; i++){
        for (let j = 0; j < bank.length; j++) {
          if (bank[j].cooldown > words[i].cooldown) {
            bank.splice(j, 0, words[i]);
            return;
          }
        }
        bank.push(words[i]);
    }
    user.wordbank = bank;
  }
  await storeUserLocal(user);
}

async function storeProgress(progress) {
  console.log('storing progress');
  try {
    const jsonValue = JSON.stringify(progress);
    await AsyncStorage.setItem('progress', jsonValue)
  } catch (e) {
    // saving error
    console.log(e);
  }
}

async function retrieveProgress() {
  try {
    const jsonValue = await AsyncStorage.getItem('progress');
    //console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
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
  review, learnNew, getStyle, retrieveProgress
};
