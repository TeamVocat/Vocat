import {review, learn, grab, UserWord, UserWordBank, store, retrieve} from './Functions.js';

let screens = {};
async(){
  await learn(screens);
  console.log(screens);
}
export default {screens};
