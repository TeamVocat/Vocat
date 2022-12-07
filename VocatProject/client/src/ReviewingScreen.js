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
  ScrollView,
  Header
} from "react-native";
import { getSettings, review, getStyle, generateAnswers, storeUserLocal, getUserLocal, addWordtoBank } from './Functions.js';

const LearningScreen = ({ navigation, route }) => {
  const [vocabWordsArr, setVocabWordsArr] = useState([1, 2, 3, 4]);
  const [answersArr, setAnswersArr] = useState([1, 2, 3, 4]);
  const [activeButton, setActiveButton] = useState(-1);
  const [doneReviewing, setDoneReviewing] = useState(false);
  const [settings, setSettings] = useState({ textSize: 20 })

  async function fetchMessage() {
    setDoneReviewing(false);
    try {
      const user = await getUserLocal();
      if (user.reviewToday.length > 0) {
        const newArray = user.reviewToday;
        setVocabWordsArr(newArray);
        setAnswersArr(newArray[0].answers);
      }
      else {
        await review(user);
        if (user.reviewToday.length > 0) { //first time here today
          const newArray = user.reviewToday;
          setVocabWordsArr(newArray);
          setAnswersArr(newArray[0].answers);
        }
        else { //done today
          setDoneReviewing(true);
        }
      }
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
      <View id="center_content" style={styles.header}>
        <Text style={styles.headerTitle}>
          Reviewing
        </Text>
      </View>
      {doneReviewing == false &&
        <View id="center_content" style={styles.content}>
          <ScrollView style={[]}>
            <Text style={{ fontSize: settings.textSize }}>
              {vocabWordsArr[0].definition}
            </Text>
          </ScrollView>
          <Pressable
            style={[styles.choices, { backgroundColor: getStyle(0, activeButton, answersArr[0]) }]}
            onPress={() => { setActiveButton(0); }}>
            <Text style={styles.subtext}>
              A. {answersArr[0].word}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.choices, { backgroundColor: getStyle(1, activeButton, answersArr[1]) }]}
            onPress={() => { setActiveButton(1); }}>
            <Text style={styles.subtext}>
              B. {answersArr[1].word}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.choices, { backgroundColor: getStyle(2, activeButton, answersArr[2]) }]}
            onPress={() => { setActiveButton(2); }}>
            <Text style={styles.subtext}>
              C. {answersArr[2].word}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.choices, { backgroundColor: getStyle(3, activeButton, answersArr[3]) }]}
            onPress={() => { setActiveButton(3); }}>
            <Text style={styles.subtext}>
              D. {answersArr[3].word}
            </Text>
          </Pressable>

        </View>
      }
      {doneReviewing == true &&
        <View style={styles.content}>
          <Text style={[{ fontSize: settings.textSize }, { top: '30%' }]}>
            Congrats! You have finished reviewing!
          </Text>
        </View>
      }

      <TouchableOpacity style={styles.nextButton}
        onPress={async () => {
          if (!doneReviewing) {
            if (activeButton < 4) {
              setActiveButton(activeButton + 4);
            }
            else {
              //update user
              const user = await getUserLocal();
              //check if correct
              if (answersArr[activeButton - 4].correct) {
                //correct, remove from review array
                if (vocabWordsArr[0].cooldown != 3) {  //got right the first time we met it
                  vocabWordsArr[0].cooldown = 14;
                }
                //put the word back in wordBank
                addWordtoBank(vocabWordsArr[0], user);
                //give coins to user
                user.coinNum += 1;
              }
              else {
                //got wrong, push to end of review array
                vocabWordsArr[0].cooldown = 3;
                vocabWordsArr[0].answers = await generateAnswers(vocabWordsArr[0].word);
                vocabWordsArr.push(vocabWordsArr[0]);
                setVocabWordsArr(vocabWordsArr);
              }
              //update page
              if (vocabWordsArr.length > 1) {
                setActiveButton(-1);
                let newArr = vocabWordsArr.slice(1);
                user.reviewToday = newArr;
                setVocabWordsArr(newArr);
                setAnswersArr(newArr[0].answers);
              }
              else {
                user.reviewToday = [];
                setDoneReviewing(true);
              }
              console.log(user, user.reviewToday);
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
  Word: {
    textAlign: 'center',
    bottom: 0,
    borderBottomColor: '#95C3BE',
    borderBottomWidth: 10,
  },
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
    width: '100%',
    top: '10%',
    bottom: '30%',
    alignContent: 'center',
    alignItems: 'center'
  },
  choices: {
    borderRadius: 10,
    padding: 5,
    margin: 10,
    width: '60%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: '10%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A9D8F'
  },
  headerTitle: {
    fontSize: 40,
  }
});

export default LearningScreen;
