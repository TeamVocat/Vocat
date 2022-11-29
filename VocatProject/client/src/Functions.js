import React, { useEffect, useState } from "react";
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

let userCoins = 0;

async function review(){
  //get UserWordBank
  const wordbank = await retrieve();
  //get words that finished
  const reviewToday = [];
  let i = 0;
  while (wordbank.wordbank[0].cooldown <= 0){
    const newWord = wordbank.wordbank[0];
    newWord.answers = await generateAnswers(newWord.word);
    reviewToday.push(newWord);
    wordbank.wordbank = wordbank.wordbank.slice(1);
    if (wordbank.wordbank.length <= 0){
      break;
    }
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
  //store progress
  let progress = await retrieveProgress();
  let dates = await retrieveDate();
  const today = new Date();
  const date = parseInt(today. getMonth() + 1) + '/' + today.getDate();
  if (dates == null || progress == null){
    progress = [newWords.length];
    dates = [];
    dates.push(`${date}`);
  }
  else {
    progress.push(progress[progress.length-1]+newWords.length);
    dates.push(date);
  }
  await storeProgress(dates,progress);
  return newWords;
}

async function generateAnswers(word){
  const answers = [];
  for (let i = 0; i < 4; i++){
    let result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
    while (result.data.word.word == word){
      result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
    }
    answers.push(new Answer(result.data.word.word,false));
  }
  const correctIndex = Math.floor(Math.random() * 4);
  answers[correctIndex] = new Answer(word,true);
  return answers;
}

function getStyle(button,state,answer){
  if (state == button){
    return "#bfbfbf";
  }
  else if (state == button + 4){
    return answer.correct ? "#c7fcb8" : "#ff5252";
  }
  else if (state > 3 && answer.correct){
    return "#c7fcb8";
  }
  else {
    return "#f0f0f0";
  }
}

async function grab(/*word,*/){  //from db into user wordbank
  const result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
  const newWord = new UserWord(result.data.word.word,result.data.word.definition,result.data.word.part_of_speech,result.data.word.example);
  return newWord;
  };

class Answer{
  constructor(word, correct){  //create when user learns this word
    this.word = word;
    this.correct = correct;
  }
}

class UserWord{
  constructor(word, definition,part_of_speech,example){  //create when user learns this word
    this.word = word;
    this.definition = definition;
    this.part_of_speech = part_of_speech;
    this.example = example;
    this.cooldown = 0;
    this.doneToday = false;
    this.answers = [];
  }
  review(correct){  //boolean value
    if (correct){
      this.cooldown = 14;
      this.cooldownToday = true;
      userCoins ++;
    }
    else{
      this.cooldown = 3;
    }
    return this;  //returns the word to be put back in queue
  }
}

class UserWordBank{

  constructor(wordbank){
    this.wordbank = wordbank;
    this.reviewToday = [];
  }

  updateCD(){
    for (let i = 0; i < this.wordbank.length; i++){
      this.wordbank[i].cooldown --;
    }
  }

  //insert a userWord once the user learns it (priority queue according to cd)
  add(word){
    if (this.wordbank.length == 0){
      this.wordbank.push(word);
    }
    else{
      for (let i = 0; i < this.wordbank.length; i++){
        if (this.wordbank[i].cooldown > word.cooldown ){
          this.wordbank.splice(i, 0, word);
          return;
        }
      }
      this.wordbank.push(word);
    }
  }
}

async function store(wordbank) {
  console.log('storing wordbank');
  try {
    const jsonValue = JSON.stringify(wordbank);
    await AsyncStorage.mergeItem('wordbank', jsonValue)
  } catch (e) {
    // saving error
    console.log(e);
  }
}

async function storeProgress(date,progress) {
  console.log('storing progress');
  try {
    const storeDate = JSON.stringify(date);
    await AsyncStorage.setItem('date', storeDate)
    const storeProgress = JSON.stringify(progress);
    await AsyncStorage.setItem('progress', storeProgress)
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
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

async function retrieveProgress() {
  try {
    const jsonValue = await AsyncStorage.getItem('progress');
    //console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

async function retrieveDate() {
  try {
    const jsonValue = await AsyncStorage.getItem('date');
    //console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

export {review, learnNew, grab, userCoins, retrieve, UserWordBank, getStyle, retrieveProgress, retrieveDate};
