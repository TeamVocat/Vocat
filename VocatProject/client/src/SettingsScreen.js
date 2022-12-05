import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { TouchableOpacity, StyleSheet, Text, View, } from 'react-native';
import { storeSettings, getSettings, getUserLocal } from './Functions.js';
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from '@env';

const SettingsScreen = ({ navigation }) => {
    const [finalSize, setFinalSize] = useState();
    const [settings, setSettings] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchSettingsUser();
    }, []);

    const handleSync = async () => {
        setSettings({
            ...settings,
            textSize: finalSize,
        });
        try {
            await storeSettings(settings);
        } catch (err) {
            console.log("Settings could not be stored locally", err);
        }
        try {
            console.log(user);
            await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/updateUser`, { user });
            alert("Successfully Synced User to Database");
        } catch (err) {
            console.log("Could not update user", err);
        }
    };

    const fetchSettings = async () => {
        console.log(
            `Fetching Settings from local storage...`,
        );
        try {
            let temp_settings = await getSettings();
            if (temp_settings) {
                // console.log("new settings:", temp_settings);
                setSettings(temp_settings);
                setFinalSize(temp_settings.textSize);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSettingsUser = async () => {
        console.log(
            `Fetching Settings and User from local storage...`,
        );
        try {
            let temp_settings = await getSettings();
            if (temp_settings) {
                // console.log("new settings:", temp_settings);
                setSettings(temp_settings);
                setFinalSize(temp_settings.textSize);
            }
            let temp_user = await getUserLocal();
            if (temp_user) {
                // console.log("new user:", temp_user);
                setUser(temp_user);
            };
        } catch (error) {
            console.log(error);
        }
    };

    function style(options) {
        return {
            fontSize: options.textSize
        }
    };

    return (
        <View style={styles.settingsContainer}>
            <Text style={style(settings)}>Text fontSize: {finalSize}</Text>
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
                onPress={handleSync}>
                <Text style={{ fontSize: 20 }}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bigButton]}
                onPress={() => {
                    navigation.navigate('Home');
                }}>
                <Text style={[styles.buttonText]}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bigButton]}
                onPress={() => {
                    navigation.navigate('Home');
                }}>
                <Text style={[styles.buttonText]}>Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {
                position: 'absolute',
                bottom: 20
            }]}
                onPress={() => {
                    navigation.navigate('Home');
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