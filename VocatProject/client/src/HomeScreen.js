import React, { useEffect, useState } from 'react';
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
import catPile from './../assets/cat_pile.png';
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from '@env';
import {
  getSettings,
  getUserLocal,
  clearUserLocal,
} from './Functions.js';

const HomeScreen = props => {
  // const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [settings, setSettings] = useState({ textSize: 30, wordList: 'English' });
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
        console.log('new user:', temp_user);
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

  return (
    <View style={styles.homeContainer}>
      <ScrollView>
        <View id="header" style={styles.headerContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                top: 5,
                borderRadius: 40,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('LogIn');
            }}>
            <Text style={styles.headerButtonText}>Log In/Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                right: 90,
                top: 5,
                borderRadius: 40,
              },
            ]}>
            <Text style={styles.headerButtonText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                right: 5,
                top: 5,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('Settings');
            }}>
            <Text style={styles.headerButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View id="center_content" style={[styles.content]}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              props.navigation.navigate('Signup');
            }}>
            <Text style={styles.headerButtonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                top: 40,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('Signin');
            }}>
            <Text style={styles.headerButtonText}>Signin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                top: 80,
              },
            ]}
            onPress={() => {
              clearUserLocal();
              setUser({});
            }}>
            <Text style={styles.headerButtonText}>Signout</Text>
          </TouchableOpacity>
          <Text style={[styles.message, { fontSize: settings.textSize }]}>
            {user.username
              ? message + ', ' + user.username + '!'
              : message + '!'}
          </Text>
          <Image
            source={catPile}
            style={{
              width: 300,
              height: 300,
            }}></Image>
          <TouchableOpacity
            style={[
              styles.button,
              {
                position: 'static',
                marginBottom: 20,
                fontSize: settings.textSize,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('Learning', { settings: settings });
            }}>
            <Text style={styles.buttonText}>Learn New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                position: 'static',
                marginBottom: 20,
                fontSize: settings.textSize,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('Reviewing', { settings: settings });
            }}>
            <Text style={styles.buttonText}>Review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                position: 'static',
                marginBottom: 20,
                fontSize: settings.textSize,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('User', { settings: settings });
            }}>
            <Text style={styles.buttonText}>Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                position: 'static',
                marginBottom: 20,
                fontSize: settings.textSize,
              },
            ]}
            onPress={() => {
              props.navigation.navigate('CatHouse', { settings: settings });
            }}>
            <Text style={styles.buttonText}>My Cats</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#FEFAE0',
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
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
