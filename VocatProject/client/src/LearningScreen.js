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

const LearningScreen = ({ navigation, route }) => {
  const [settings, setSettings] = useState({ textSize: 30 });

    return (
        <View style={styles.homeContainer}>
            <View id="center_content" style={[styles.content]}>
                <Text style={[styles.message, { fontSize: settings.textSize }]}> Augment (verb)</Text>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    <Text style={styles.choicesLetter}>A.</Text>
                     make small.
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    <Text style={styles.choicesLetter}>B.</Text>
                     enlarge or increase; improve.
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    <Text style={styles.choicesLetter}>C.</Text>
                     to make an error.
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    <Text style={styles.choicesLetter}>D.</Text>
                     taking part in immoral and unethical plots.
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
