import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  StyleSheet,
  Button,
  Text,
  Alert,
  useColorScheme,
  View,
  Pressable,
  ScrollView
} from "react-native";
import { getSettings, learnNew, getUserLocal, storeUserLocal, addWordtoBank, Progress, compare } from './Functions.js';

const LearningScreen = ({ navigation, route }) => {

  const [settings, setSettings] = useState({ textSize: 20 });
  const [vocabWordsArr, setVocabWordsArr] = useState([{ word: 'null', definition: 'lalal', part_of_speech: 'foo', example: 'bar' }]);
  const [doneLearning, setDoneLearning] = useState(false);
  // const [user, setUser] = useState({ lastLogInDate: [] });
  let user;
  //const learnedArr;
  useEffect(() => {
    async function fetchMessage() {
      try {
        let newArray;
        user = await getUserLocal();
        // //several lines to clear wordbanks for testing
        // user.wordsToday = await learnNew();
        // user.wordBank = [];
        // user.wordBankProgress = 0;
        // user.reviewToday = [];

        //log progress
        const date = new Date();
        const progress = new Progress(date, user.wordBankProgress + user.wordsToday);
        if (user.lastLogInDate.length <= 0) {
          user.lastLogInDate.push(progress);
        }
        else if (compare(user.lastLogInDate[user.lastLogInDate.length - 1].dateString, date) == false) {
          user.lastLogInDate.push(progress);
        }
        //do nothing if last entry is the same
        console.log(user.lastLogInDate);
        if (user.doneLearningToday == false && user.wordsToday.length <= 0) { //has not learned today
          console.log('has not learned today, innitialize wordsToday');
          //grab new words
          user.wordsToday = await learnNew();
          console.log('wordsToday: ', user.wordsToday);
          newArray = user.wordsToday;
          console.log('newArray: ', newArray);
        }
        else {
          console.log('has learned today, continue learning');
          //grab words left for today
          if (user.wordsToday.length <= 0) {
            setDoneLearning(true);
          }
          else {
            newArray = user.wordsToday;
          }
        }
        await storeUserLocal(user);
        setVocabWordsArr(newArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, []);
  return (
    <View style={styles.homeContainer}>
      <View id="center_content" style={[styles.content]}>
        <ScrollView style={styles.scrollView}>
          {doneLearning == false &&
            <Text style={{ fontSize: settings.textSize }}>
              Word:{"\n"}{vocabWordsArr[0].word} {"\n\n"}
              Definition:{"\n"}{vocabWordsArr[0].definition} {"\n\n"}
              Part Of Speech:{"\n"}{vocabWordsArr[0].part_of_speech} {"\n\n"}
              Example:{"\n"}{"\"" + vocabWordsArr[0].example + "\""}
            </Text>
          }
          {doneLearning == true &&
            <Text style={{ fontSize: settings.textSize }}>
              Congrats! You have finished learning!
            </Text>
          }
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.nextButton}
        onPress={async () => {
          if (!doneLearning) {
            //update user.wordsToday, progress number
            if (vocabWordsArr.length > 1) {
              user = await getUserLocal();
              user.wordBankProgress++;
              user.coinNum += 5;
              await addWordtoBank(vocabWordsArr[0], user);
              let newArr = vocabWordsArr.slice(1);
              user.wordsToday = newArr;
              setVocabWordsArr(newArr);
              await storeUserLocal(user);
            }
            else {
              user = await getUserLocal();
              //show done page
              setDoneLearning(true);
              user.wordBankProgress++;
              user.wordsToday = [];
              user.doneLearningToday = true;
              user.coinNum += 5;
              await addWordtoBank(vocabWordsArr[0], user);
              await storeUserLocal(user);
            }
          }
        }}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  homeContainer: {
    width: '100%',
    height: '80%',
    flex: 1,
    alignItems: 'center'
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: "400",
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#009e81',
    width: '50%',
    position: 'absolute',
    bottom: '10%',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtext: {
    fontSize: 20,
    textAlign: 'center',
  },
  content: {
    position: 'absolute',
    top: '10%',
    bottom: '30%',
    width: '90%',
    alignContent: 'center',
    alignItems: 'center'
  },
  choices: {
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 10,
    width: '50%',
  },
  scrollView: {

  }
});

export default LearningScreen;
