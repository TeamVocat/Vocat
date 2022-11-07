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
} from "react-native";

const LearningScreen = ({ navigation, route }) => {
  const [settings, setSettings] = useState({ textSize: 30 });

    return (
        <View style={styles.homeContainer}>
            <View id="center_content" style={[styles.content]}>
                <Text style={[styles.message, { fontSize: settings.textSize }]}> Vocab Word</Text>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    A. Answer 1
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    B. (Correct) Answer 2
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    C. Answer 3
                    </Text>
                </Pressable>
                <Pressable style={styles.choices}>
                    <Text style={styles.subtext}>
                    D. Answer 4
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
