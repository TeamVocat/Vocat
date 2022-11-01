import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, DeviceEventEmitter, StyleSheet, Button, Text, Alert, useColorScheme, View, } from 'react-native';
import catPile from './components/cat_pile.png';


const LearningScreen = ({ navigation, route }) => {
    const [settings, setSettings] = useState({ textSize: 30 });

    return (
        <View style={styles.homeContainer}>
            <View id="center_content" style={[styles.content]}>
                <Text style={[styles.message, { fontSize: settings.textSize }]}> Vocab Word</Text>
                <Button title='A. Answer 1'></Button>
                <Button title='B. Correct Answer 2'></Button>
                <Button title='C. Answer 3'></Button>
                <Button title='D. Answer 4'></Button>

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
    content: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default LearningScreen;