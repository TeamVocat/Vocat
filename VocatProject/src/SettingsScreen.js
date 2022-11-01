import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { TouchableOpacity, DeviceEventEmitter, StyleSheet, Button, Text, Alert, useColorScheme, View, } from 'react-native';


const SettingsScreen = ({ props, navigation, route }) => {
    const [finalSize, setFinalSize] = useState(route.params.settings.textSize);

    function style(options) {
        return {
            fontSize: options.textSize
        }
    }

    return (
        <View style={styles.settingsContainer}>
            <Text style={style(route.params.settings)}>Text fontSize: {finalSize}</Text>
            <Slider
                id='fontSizeSlider'
                minimumValue={15}
                maximumValue={50}
                step={1}
                value={finalSize}
                onValueChange={value => setFinalSize(value)}
                style={styles.slider}
            />
            <TouchableOpacity style={[styles.button]}
                onPress={() => {
                    let temp = route.params.settings;
                    temp.textSize = finalSize;
                    DeviceEventEmitter.emit("event.changeSettings", temp);
                }}>
                <Text style={{ fontSize: 20 }}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bigButton]}
                onPress={() => {
                    navigation.navigate('Home', { settings: route.params.settings });
                }}>
                <Text style={[styles.buttonText]}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bigButton]}
                onPress={() => {
                    navigation.navigate('Home', { settings: route.params.settings });
                }}>
                <Text style={[styles.buttonText]}>Feedback</Text>
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
        </View >
    );
};


const styles = StyleSheet.create({
    settingsContainer: {
        backgroundColor: '#FEFAE0',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center'
    },
    // sliderContainer: {
    //     width: '100%',
    //     flexDirection: 'row'
    // },
    slider: {
        backgroundColor: '#D3D3D3',
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        padding: 5,
    },
    bigButton: {
        backgroundColor: '#CCD5AE',
        borderRadius: 30,
        padding: 5,
        alignItems: 'center',
        width: 250,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 30
    },
    button: {
        backgroundColor: '#CCD5AE',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    headerContainer: {
        flexDirection: 'row'
    },
    message: {
        marginTop: '30%',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default SettingsScreen;