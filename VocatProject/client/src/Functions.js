import React, { useEffect, useState } from "react";
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

let userCoins = 0;

function review(wordbank){
  //get words that finished cd
  const reviewToday = wordbank.getReview();

  //review while not all words today are finished
  while (reviewToday.length > 0){
    let currentWord = reviewToday.shift();

    //the review

    //decide to put back or review again
    if (!currentWord.doneToday){
      reviewToday.push(currentWord);
    }
    else {
      //put back if done
      wordbank.add(currentWord);
      userCoins ++;
    }
  }
}

async function learn(wordbank,newWords){
  for (let i = 0; i < 5; i++){
    const newWord = await grab(/*word,*/);
    newWord.cooldown = Math.floor(Math.random() * 100);
    newWords.push(newWord);
  }
  while (newWords.length > 0){

    let currentWord = newWords.shift();
    //learn the word
    //ask the user to decide to review it today or pass

    //give user coins
    // if (!currentWord.doneToday){  //put back if still needs review
    //   newWords.addToday(currentWord);
    // }
    // else {
    //   wordbank.add(currentWord);
    //   userCoins += 5;
    // }
    wordbank.add(currentWord);
  }
  store(wordbank);
}

async function grab(/*word,*/){  //from db into user wordbank
  const result = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
  const newWord = new UserWord(result.data.word.word,result.data.word.definition);
  return newWord;
  };

class UserWord{
  constructor(word,definition){  //create when user learns this word
    this.word = word;
    this.definition = definition;
    this.cooldown = 1;
    this.doneToday = false;
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
  constructor(){
    this.wordbank = [];
    this.reviewToday = [];
  }

  getReview(){
    while (this.wordbank[0].cooldown <= 0){
      this.reviewToday.push(this.wordbank.shift());
    }
    return this.reviewToday;
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

  // addToday(word){
  //   let lo = 0;
  //   let hi = this.wordbank.length-1;
  //   while (this.wordbank[mid].cooldownToday != word.cooldownToday && lo < hi){
  //     let mid = lo+hi/2;
  //     if (this.wordbank[mid].cooldownToday < word.cooldownToday ){
  //       lo = mid + 1;
  //     }
  //     else if (this.wordbank[mid].cooldownToday > word.cooldownToday){
  //       hi = mid - 1;
  //     }
  //   }
  //   this.wordbank.splice(mid, 0, word);
  // }
}

async function store(wordbank) {
  try {
    const jsonValue = JSON.stringify(wordbank);
    await AsyncStorage.setItem('wordbank', jsonValue)
  } catch (e) {
    // saving error
    console.log(e);
  }
}


async function retrieve() {
  try {
    const jsonValue = await AsyncStorage.getItem('wordbank');
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

export {review, learn, grab, UserWord, UserWordBank, userCoins, retrieve};
