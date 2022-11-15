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

const LearningScreen = ({ navigation, route }) => {
    const [settings, setSettings] = useState({ textSize: 30 });
    const [vocabWordsArr, setVocabWordsArr] = useState([1, 2, 3, 4]);

    useEffect(() => {
        async function fetchMessage() {
            console.log(`Fetching Message from ${REACT_APP_SERVER_HOSTNAME}/api/newVocab...`);
            try {
                let tempVocabArr = [];
                for (let index = 0; index < 4; index++) {
                    const results = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/newVocab`);
                    tempVocabArr.push(results.data.word);
                }
                setVocabWordsArr(tempVocabArr);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessage();
    }, []);

    return (
        <View style={styles.homeContainer}>
            <View id="center_content" style={[styles.content]}>
                <Text style={[styles.message, { fontSize: settings.textSize }]}>
                    Definition: {vocabWordsArr[0].definition} {"\n"}
                    Part of speech: {vocabWordsArr[0].part_of_speech} {"\n"}
                    Example: {"\"" + vocabWordsArr[0].example + "\""}
                </Text>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                        A. {vocabWordsArr[0].word}
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                        B. {vocabWordsArr[1].word}
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                        C. {vocabWordsArr[2].word}
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                        D. {vocabWordsArr[3].word}
                    </Text>
                </Pressable>
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
        marginTop: '30%',
    },
    subtext: {
        fontSize: 20
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    choices: {
        backgroundColor: '#CCD5AE',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    }
});

export default LearningScreen;
