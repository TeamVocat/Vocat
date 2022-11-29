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
import { screens } from './functions/Words.js';
import { review, UserWordBank, learnNew, grab, store, retrieve, getStyle } from './Functions.js';

const LearningScreen = ({ navigation, route }) => {
    const [vocabWordsArr, setVocabWordsArr] = useState([1, 2, 3, 4]);
    const [answersArr, setAnswersArr] = useState([1, 2, 3, 4]);
    const [activeButton, setActiveButton] = useState(-1);

    useEffect(() => {
        async function fetchMessage() {
            try {
                const newArray = await review();
                setVocabWordsArr(newArray);
                setAnswersArr(newArray[0].answers);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessage();
    }, []);

    return (
        <View style={styles.homeContainer}>
            <View id="center_content" style={ styles.content }>
            <ScrollView style={styles.scrollView}>
                <Text style={{ fontSize: route.params.settings.textSize }}>
                    {vocabWordsArr[0].definition} {"\n"}
                </Text>
            </ScrollView>
                <Pressable
                        style={[styles.choices,{ backgroundColor: getStyle(0,activeButton,answersArr[0]) }]}
                        onPress={ () => {setActiveButton(0);}}>
                        <Text style={styles.subtext}>
                            A. {answersArr[0].word}
                        </Text>
                </Pressable>
                <Pressable
                        style={[styles.choices,{ backgroundColor: getStyle(1,activeButton,answersArr[1]) }]}
                        onPress={ () => {setActiveButton(1);}}>
                        <Text style={styles.subtext}>
                            B. {answersArr[1].word}
                        </Text>
                </Pressable>
                <Pressable
                        style={[styles.choices,{ backgroundColor: getStyle(2,activeButton,answersArr[2]) }]}
                        onPress={ () => {setActiveButton(2);}}>
                        <Text style={styles.subtext}>
                            C. {answersArr[2].word}
                        </Text>
                </Pressable>
                <Pressable
                        style={[styles.choices,{ backgroundColor: getStyle(3,activeButton,answersArr[3]) }]}
                        onPress={ () => {setActiveButton(3);}}>
                        <Text style={styles.subtext}>
                            D. {answersArr[3].word}
                        </Text>
                </Pressable>
            </View>


            <TouchableOpacity style={ styles.nextButton }
                onPress={() => {
                    if (activeButton < 4) {
                        //check if correct
                        if (answersArr[activeButton].correct){

                        }
                        setActiveButton(activeButton+4);
                    }
                    else if (vocabWordsArr.length > 1 && activeButton < 8){
                      setActiveButton(-1);
                      let newArr = vocabWordsArr.slice(1);
                      //console.log(newArr);
                      setVocabWordsArr(newArr);
                      setAnswersArr(newArr[0].answers);
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
