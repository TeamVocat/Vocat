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
import { Iconoir, User, Lock, Mail } from 'iconoir-react-native';

import { Images } from '../assets';

import { REACT_APP_SERVER_HOSTNAME } from "@env";
import axios from 'react-native-axios';

const SignUpScreen = ({ navigation, route }) => {
  const cyan = '#2a9d8f';
  const [settings, setSettings] = useState({ textSize: 30 });
  const [userText, setUserText] = React.useState('');
  const [passText, setpassText] = React.useState('');
  const [emailText, setEmailText] = React.useState('');

  //const [userFocused, setUserFocused] = useState(false);
  //const [passFocused, setPassFocused] = useState(false);

  //const [logoSize, setLogoSize] = React.useState(120);
  const [textLocHeight, setTextLocHeight] = React.useState(10);
  const IMAGE_HEIGHT_SMALL = 110;
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
    if (userText === '' || emailText === '' || passText === '') {
      alert("All fields are required");
      return;
    }
    const res = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/signup`, { name: userText, email: emailText, password: passText });
    if (res.data.error) {
      alert(res.data.error);
    } else {
      alert("Sign Up Successful");
      navigation.navigate('LogIn');
    }
  };

  useEffect(() => {
    const show1 = Keyboard.addListener('keyboardWillShow', event => {
      //   Animated.timing(logoSize, {
      //     duration: event.duration,
      //     toValue: IMAGE_HEIGHT_SMALL,
      //   }).start();
      //setTextLocHeight(-20);
    });
    const show2 = Keyboard.addListener('keyboardDidShow', event => {
      // Animated.timing(logoSize, {
      //   duration: event.duration,
      //   toValue: IMAGE_HEIGHT_SMALL,
      // }).start();
      setTextLocHeight(-10);
    });
    const hide1 = Keyboard.addListener('keyboardWillHide', event => {
      setTextLocHeight(10);
    });
    const hide2 = Keyboard.addListener('keyboardDidHide', event => {
      // Animated.timing(logoSize, {
      //   duration: event.duration,
      //   toValue: IMAGE_HEIGHT_LARGE,
      // }).start();
      //setTextLocHeight(10);
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
      <View class="header" style={[styles.header, { flex: 1 }]}>
        <View class="logo_login" style={{ flex: 3.5 }}>
          <Animated.Image
            source={Images.logos.logo_titled_transparent}
            style={{
              height: logoSize,
              width: logoSize,
            }}
          />
        </View>

        <View class="title_signup" style={{ flex: 1 }}>
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
                  width: 90,
                  fontSize: 18,
                  textAlign: 'center',
                  color: cyan,
                  top: -2,
                }}>
                Sign Up
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
              style={{ position: 'relative', left: 44, top: 23, zIndex: 10 }}
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
            <Mail
              color="#AAAAAA"
              height={22}
              width={25}
              style={{ position: 'relative', left: 44, top: 25, zIndex: 10 }}
            />
            <TextInput
              style={[styles.input]}
              onChangeText={text => setEmailText(text)}
              value={emailText}
              placeholder="email"
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
              style={{ position: 'relative', left: 44, top: 23, zIndex: 10 }}
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
            flex: 1,
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
              Register
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              color: 'black',
            }}>
            Already have an account?
          </Text>
          <Text
            style={{ textAlign: 'center', fontSize: 13, color: cyan }}
            onPress={() =>
              navigation.navigate('LogIn', { settings: route.params.settings })
            }>
            Sign in here.
          </Text>
        </View>
      </View>
    </View>
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

export default SignUpScreen;
