import React, {useEffect, useState} from 'react';
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
  ScrollView,
} from 'react-native';
import axios from 'react-native-axios';
import {REACT_APP_SERVER_HOSTNAME} from '@env';
import {getSettings, getUserLocal, clearUserLocal} from './Functions.js';
import {Images} from '../assets/';

const HomeScreen = props => {
  // const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [settings, setSettings] = useState({textSize: 30, wordList: 'English'});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchSettingsUser();
      fetchMessage();
      // alert('Refreshed');
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchSettingsUser = async () => {
    console.log(`Fetching Settings and User from local storage...`);
    try {
      let temp_settings = await getSettings();
      if (temp_settings) {
        console.log('new settings:', temp_settings);
        setSettings(temp_settings);
      }
      let temp_user = await getUserLocal();
      if (temp_user) {
        // console.log('new user:', temp_user);
        setUser(temp_user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessage = async () => {
    console.log(
      `Fetching Message from ${REACT_APP_SERVER_HOSTNAME}/api/home...`,
    );
    try {
      const message = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/home`);
      setMessage(message.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  let topvalue = user.username ? '-200' : '-170';

  return (
    <View style={styles.homeContainer}>
      <View id="header" style={styles.headerContainer}></View>
      <View id="center_content" style={[styles.content]}>
        <View id="messageView" style={{width: '80%', top: 50}}>
          <Text style={[styles.message, {fontSize: settings.textSize}]}>
            {user.username
              ? message + ', \n' + user.username + '!'
              : message + '!'}
          </Text>
        </View>
        <Image
          source={Images.general.welcome_larger}
          style={{
            position: 'absolute',
            width: 500,
            height: 750,
            resizeMode: 'contain',
            top: -40,
            zIndex: 10,
          }}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  button: {
    backgroundColor: '#CCD5AE',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
  },
  headerButtonText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  message: {
    marginTop: '30%',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#274160',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
