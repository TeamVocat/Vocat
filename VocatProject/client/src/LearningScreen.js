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
import { Images } from '../assets/';
import { set } from "mongoose";

const LearningScreen = ({ props, navigation, route }) => {

  const [settings, setSettings] = useState({ textSize: 20 });
  const [vocabWordsArr, setVocabWordsArr] = useState([{ word: 'null', definition: 'lalal', part_of_speech: 'foo', example: 'bar' }]);
  const [doneLearning, setDoneLearning] = useState(false);
  const [user1, setUser] = useState({});
  let user;
  //const learnedArr;

  async function fetchMessage() {
    try {
      let newArray;
      user = await getUserLocal();
      // //several lines to clear wordbanks for testing
      // user.wordsToday = await learnNew();
      // user.wordBank = [];
      // user.wordBankProgress = 0;
      // user.reviewToday = [];
      // console.log("WORDS TODAY: " + user.wordsToday);
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
      // console.log(user.lastLogInDate);
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
      setUser(user);
      await storeUserLocal(user);
      setVocabWordsArr(newArray);
      // console.log(user.wordBank);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSettings = async () => {
    console.log(`Fetching Settings from local storage...`);
    try {
      let temp_settings = await getSettings();
      if (temp_settings) {
        console.log('new settings:', temp_settings);
        setSettings(temp_settings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMessage();
      fetchSettings();
      // alert('Refreshed');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.homeContainer}>
      <View id="header" style={[styles.header]}>
        <Text id="header-text" style={[styles.header_text]}>
          Learning
        </Text>
        <View id="coins-container" style={[styles.coinsContainer]}>
          <Image
            source={Images.general.catcoin}
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode="contain"></Image>
          <Text style={styles.coins}>
            {user1 && user1.coinNum}
          </Text>
        </View>
      </View>
      <View id="center-content" style={[styles.content]}>
        <ScrollView style={styles.scrollView}>
          {doneLearning == false &&
            <View>
              <View id="word-section" style={styles.word_section}>
                <Text id="word" style={[styles.word, { fontSize: settings.textSize * (1.2) }]}>
                  {vocabWordsArr[0].word}
                </Text>
              </View>
              <View id="definition-section" style={styles.definiton_section}>
                <Text id="part-of-speech" style={[{ fontSize: settings.textSize * (0.7) }]}>
                  {vocabWordsArr[0].part_of_speech}
                </Text>
                <Text id="definiton" style={[{ fontSize: settings.textSize }, styles.definiton]}>
                  {vocabWordsArr[0].definition}
                </Text>
              </View>
              <View id="examples-section" style={styles.example_section}>
                <View id="examples-header-section" style={styles.example_header_section}>
                  <Text id="examples-header" style={[{ fontSize: settings.textSize * (0.8) }]}>
                    Example
                  </Text>
                </View>
                <Text id="example" style={[{ fontSize: settings.textSize }, styles.example]}>
                  "{vocabWordsArr[0].example}"
                </Text>
              </View>
            </View>
          }
          {doneLearning == true &&
            <Text style={[{ fontSize: settings.textSize }, styles.congrats]}>
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
              setUser(user);
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
              setUser(user);
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
    height: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: "400",
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#009e81',
    width: '70%',
    position: 'absolute',
    bottom: 20,
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
    alignItems: 'center',
    height: '76%'
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

  },
  word_section: {
    borderBottomColor: 'rgba(149, 196, 190, 0.5)',
    borderBottomWidth: 10,
    width: '50%',
    alignSelf: "center",
    height: 49,
    marginTop: 30
  },
  word: {
    textAlign: "center",
    color: '#264653',
  },
  definiton_section: {
    borderRadius: 30,
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#EFEFEF',
    marginTop: 30,
    padding: 20,
    elevation: 5,
  },
  definiton: {
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
    // textAlign: 'justify',
  },
  example_header_section: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  example_section: {
    borderRadius: 30,
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#EFEFEF',
    marginTop: 40,
    padding: 10,
    elevation: 5,
    marginBottom: 20
  },
  example: {
    padding: 10,
  },
  congrats: {
    textAlign: 'center',
    marginTop: '50%',
    fontFamily: 'monospace'
  },
  header: {
    backgroundColor: '#2A9D8F',
    width: '100%',
    height: 70,
    flexDirection: 'row'
  },
  header_text: {
    fontSize: 25,
    margin: 16,
    marginLeft: 35,
    color: '#ffffff',
  },
  coinsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 200,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DCDCDC',
    margin: 7,
    position: "relative",
    marginLeft: 120,
    width: 110
  },
  coins: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: 30
  }
});

export default LearningScreen;
