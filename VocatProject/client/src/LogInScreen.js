import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import {
  Animated,
  Keyboard,
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
  TextInput,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Iconoir, User, Lock } from 'iconoir-react-native';

import { Images } from '../assets/';

import { REACT_APP_SERVER_HOSTNAME } from "@env";
import axios from 'react-native-axios';
import { getUserLocal, storeUserLocal } from './Functions.js';

const LogInScreen = ({ navigation, route }) => {
  const cyan = '#2a9d8f';
  const [userText, setUserText] = React.useState('');
  const [passText, setpassText] = React.useState('');
  //const [userFocused, setUserFocused] = useState(false);
  //const [passFocused, setPassFocused] = useState(false);

  //const [logoSize, setLogoSize] = React.useState(120);
  const [textLocHeight, setTextLocHeight] = React.useState(10);
  const IMAGE_HEIGHT_SMALL = 130;
  const IMAGE_HEIGHT_LARGE = 200;

  //   Keyboard.addListener('keyboardWillShow', event => {
  //     Animated.timing(imageHeight, {
  //       duration: event.duration,
  //       toValue: IMAGE_HEIGHT_SMALL,
  //     }).start();
  //   });
  //   Keyboard.addListener('keyboardWillHide', event => {
  //     Animated.timing(imageHeight, {
  //       duration: event.duration,
  //       toValue: IMAGE_HEIGHT_LARGE,
  //     }).start();
  //   });
  let logoSize = new Animated.Value(IMAGE_HEIGHT_LARGE);

  const handleSubmit = async () => {
    if (userText === '' || passText === '') {
      alert("All fields are required");
      return;
    }
    try {
      let statusJSON;
      await fetchDate().then(async (date) => {
        console.log("DATE: ", date);
        statusJSON = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/signin`,
          { email: userText, password: passText, date })
      });
      console.log("Lastlogindate: ", statusJSON.data.user);
      if (statusJSON.data.error) {
        alert(statusJSON.data.error);
      } else {
        await storeUserLocal(statusJSON.data.user);
        alert("Signin Successful!");
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchDate = async () => {
    try {
      const dateJSON = await axios.get(`${REACT_APP_SERVER_HOSTNAME}/api/getDate`);
      console.log("FETCHDATE: ", dateJSON.data.obj);
      return dateJSON.data.obj;
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    const show1 = Keyboard.addListener('keyboardWillShow', event => {
      //setTextLocHeight(-20);
    });
    const show2 = Keyboard.addListener('keyboardDidShow', event => {
      Animated.timing(logoSize, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
        useNativeDriver: false,
      }).start();
      setTextLocHeight(-10);
    });
    const hide1 = Keyboard.addListener('keyboardWillHide', event => {
      Animated.timing(logoSize, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_LARGE,
        useNativeDriver: false,
      }).start();
      setTextLocHeight(10);
    });
    const hide2 = Keyboard.addListener('keyboardDidHide', event => {
      Animated.timing(logoSize, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_LARGE,
        useNativeDriver: false,
      }).start();
      // setTextLocHeight(10);
    });

    return () => {
      show1.remove();
      show2.remove();
      hide1.remove();
      hide2.remove();
    };
  }, []);

  return (
    <View style={styles.logInContainer}>
      <View class="header" style={[styles.header, { flex: 1.4 }]}>
        <View class="logo_login" style={{ flex: 3 }}>
          <Animated.Image
            source={Images.logos.logo_titled_transparent}
            style={{
              top: 10,
              height: logoSize,
              width: logoSize,
            }}
          />
        </View>

        <View class="title_login" style={{ flex: 1.8 }}>
          <View
            style={{
              margin: 0,
              width: 300,
              flex: 1,
              textAlign: 'center',
              fontSize: 18,
              color: cyan,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1, height: 1, backgroundColor: cyan }} />
            <View>
              <Text
                style={{
                  width: 80,
                  fontSize: 18,
                  textAlign: 'center',
                  color: cyan,
                  top: -2,
                }}>
                Log In
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: cyan }} />
          </View>
        </View>
      </View>

      <View class="contents" style={[styles.contents, { flex: 2 }]}>
        <View
          class="inputfields"
          style={{
            flex: 2,
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            position: 'relative',
          }}>
          <View
            style={{
              flexDirection: 'row',
              right: 12,
            }}>
            <User
              color="#AAAAAA"
              height={25}
              width={25}
              style={{ position: 'relative', left: 45, top: 23, zIndex: 10 }}
            />
            <TextInput
              style={[styles.input]}
              onChangeText={text => setUserText(text)}
              value={userText}
              placeholder="username"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              right: 12,
            }}>
            <Lock
              color="#AAAAAA"
              height={25}
              width={25}
              style={{ position: 'relative', left: 45, top: 23, zIndex: 10 }}
            />
            <TextInput
              style={styles.input}
              onChangeText={text => setpassText(text)}
              secureTextEntry={true}
              value={passText}
              placeholder="password"
            />
          </View>
        </View>
        <View
          class="submit"
          style={{
            flex: 2,
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity onPress={handleSubmit} style={[styles.button, { width: 300, height: 50 }]}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
              }}>
              Log In
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              color: 'black',
            }}>
            Don't have an account?
          </Text>
          <Text
            style={{ textAlign: 'center', fontSize: 13, color: cyan }}
            onPress={() =>
              navigation.navigate('Register')
            }>
            Sign up here.
          </Text>
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  logInContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contents: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    height: 50,
    margin: 10,
    marginBottom: 15,
    paddingLeft: 40,
    alignSelf: 'center',
    borderColor: '#AAAAAA',
    color: '#AAAAAA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#2a9d8f',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default LogInScreen;
