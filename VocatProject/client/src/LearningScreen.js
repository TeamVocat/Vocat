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
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import {screens} from './functions/Words.js';
import {learnNew, getUserLocal, storeUserLocal, addWordtoBank} from './Functions.js';

const LearningScreen = ({ navigation, route }) => {

    const [settings, setSettings] = useState({ textSize: 20 });
    const [vocabWordsArr, setVocabWordsArr] = useState([1, 2, 3, 4]);
    const [doneLearning, setDoneLearning] = useState(false);
    //const learnedArr;
    let user;

    useEffect(() => {
        async function fetchMessage() {
            try {
              const date = new Date().toDateString();
              let newArray;
              user = await getUserLocal();
              user.wordsToday = await learnNew();
              user.reviewToday = [];
              await storeUserLocal(user);
              if (user.wordsToday == null){ //has not learned today
                console.log('has not learned today, innitialize wordsToday');
                //grab new words
                newArray = await learnNew();
                user.wordsToday = newArray;
              }
              else {
                console.log('has learned today, continue learning');
                //grab words left for today
                if (user.wordsToday == 'done'){
                  setDoneLearning(true);
                }
                else{
                  newArray = user.wordsToday;
                }
              }
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
                { doneLearning == false &&
                  <Text style={{ fontSize: route.params.settings.textSize }}>
                      Word:{"\n"}{vocabWordsArr[0].word} {"\n\n"}
                      Definition:{"\n"}{vocabWordsArr[0].definition} {"\n\n"}
                      Part Of Speech:{"\n"}{vocabWordsArr[0].part_of_speech} {"\n\n"}
                      Example:{"\n"}{"\"" + vocabWordsArr[0].example + "\""}
                  </Text>
                }
                { doneLearning == true &&
                  <Text style={{ fontSize: route.params.settings.textSize }}>
                      Congrats! You have finished learning!
                  </Text>
                }
            </ScrollView>
            </View>
            <TouchableOpacity style={ styles.nextButton }
                onPress={async () => {
                  if (!doneLearning){
                    //update user.wordsToday, progress number
                    if (vocabWordsArr.length > 1){
                      user = await getUserLocal();
                      user.wordsToday = newArr;
                      user.wordBankProgress ++;
                      await addWordtoBank(vocabWordsArr[0],user);
                      let newArr = vocabWordsArr.slice(1);
                      setVocabWordsArr(newArr);
                      await storeUserLocal(user);
                    }
                    else{
                      user = await getUserLocal();
                      //show done page
                      setDoneLearning(true);
                      user.wordBankProgress ++;
                      user.wordsToday = 'done';
                      await addWordtoBank(vocabWordsArr[0],user);
                      await storeUserLocal(user);
                    }
                  }
                }}>
                <Text style={ styles.nextButtonText }>Next</Text>
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
