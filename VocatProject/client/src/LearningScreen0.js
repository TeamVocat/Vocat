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
} from "react-native";
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import {screens} from './functions/Words.js';
import {review, learn, grab, UserWord, UserWordBank, store, retrieve} from './functions/Functions.js';

const LearningScreen = ({ navigation, route }) => {
    let userWordBank = new UserWordBank();

    const [settings, setSettings] = useState({ textSize: 30 });
    const [vocabWordsArr, setVocabWordsArr] = useState([1, 2, 3, 4]);
    let i = 0;

    useEffect(() => {
        async function fetchMessage() {
            console.log(`Fetching Vocab Word from ${REACT_APP_SERVER_HOSTNAME}/api/newVocab...`);
            try {
              const newArray = await learn([]);
                setVocabWordsArr(newArray);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessage();
    }, []);

    while (true){
        return (
            <View style={styles.homeContainer}>
                <View id="center_content" style={[styles.content]}>
                    <Text style={[styles.message, { fontSize: settings.textSize }]}>
                        Definition: {vocabWordsArr[i].definition} {"\n"}
                        Part of speech: {vocabWordsArr[i].part_of_speech} {"\n"}
                        Example: {"\"" + vocabWordsArr[i].example + "\""}
                    </Text>
                    <Pressable style={styles.choices}>
                        <Text style={styles.subtext}>
                            A. {vocabWordsArr[0].word}
                        </Text>
                    </Pressable>
                    <Pressable style={styles.choices}>
                        <Text style={styles.subtext}>
                            B. {vocabWordsArr[0].word}
                        </Text>
                    </Pressable>
                    <Pressable style={styles.choices}>
                        <Text style={styles.subtext}>
                            C. {vocabWordsArr[0].word}
                        </Text>
                    </Pressable>
                    <Pressable style={styles.choices}>
                        <Text style={styles.subtext}>
                            D. {vocabWordsArr[0].word}
                        </Text>
                    </Pressable>

                    <TouchableOpacity style={[styles.button, {
                        position: 'relative',
                        top: '5%'
                    }]}
                        onPress={() => {
                          if (vocabWordsArr.length > 1){
                            vocabWordsArr.shift();
                            let newArr = vocabWordsArr;
                            console.log(newArr);
                            setVocabWordsArr(newArr);
                          }
                          else{
                            console.log('done');
                          }
                        }}>
                        <Text style={{ fontSize: 30 }}>Next</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, {
                        position: 'absolute',
                        bottom: 20
                    }]}
                        onPress={() => {
                            navigation.navigate('Home', { settings: route.params.settings });
                        }}>
                        <Text style={{ fontSize: 30 }}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
      }
};

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: '#FEFAE0',
        width: '100%',
        height: '100%',
        flex: 1
    },
    button: {
        backgroundColor: '#CCD5AE',
        borderRadius: 10,
        padding: 5,
        position: 'absolute',
    },
    headerButtonText: {
        fontSize: 20
    },
    buttonText: {
        fontSize: 30
    },
    headerContainer: {
        flexDirection: 'row'
    },
    message: {
        marginTop: '10%',
    },
    subtext: {
        fontSize: 20,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    choices: {
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        paddingRight: 5,
        margin: 10,
    },
    choicesLetter: {
        fontSize: 26,
        backgroundColor: '#CCD5AE',
        borderRadius: 25,
        marginRight: 10,
    }
});

export default LearningScreen;
