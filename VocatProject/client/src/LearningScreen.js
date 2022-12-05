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
import { getSettings, review, UserWordBank, learnNew, grab, store, retrieve } from './Functions.js';

const LearningScreen = ({ navigation, route }) => {

    const [settings, setSettings] = useState({});
    const [vocabWordsArr, setVocabWordsArr] = useState([1, 2, 3, 4]);
    //const learnedArr;

    async function fetchVocab() {
        try {
            const newArray = await learnNew([]);
            setVocabWordsArr(newArray);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchSettings = async () => {
        try {
            let temp_settings = await getSettings();
            if (temp_settings) {
                // console.log("new settings:", temp_settings);
                setSettings(temp_settings);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchVocab();
        fetchSettings();
    }, []);

    return (
        <View style={styles.homeContainer}>
            <View id="center_content" style={[styles.content]}>
                <ScrollView style={styles.scrollView}>
                    <Text style={{ fontSize: settings.textSize }}>
                        Word:{"\n"}{vocabWordsArr[0].word} {"\n\n"}
                        Definition:{"\n"}{vocabWordsArr[0].definition} {"\n\n"}
                        Part Of Speech:{"\n"}{vocabWordsArr[0].part_of_speech} {"\n\n"}
                        Example:{"\n"}{"\"" + vocabWordsArr[0].example + "\""}
                    </Text>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.nextButton}
                onPress={() => {
                    if (vocabWordsArr.length > 1) {
                        let newArr = vocabWordsArr.slice(1);
                        setVocabWordsArr(newArr);
                    }
                    else {
                        //await store(new UserWordBank());
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
