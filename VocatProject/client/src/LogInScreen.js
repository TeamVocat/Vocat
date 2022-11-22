import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
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
  TextInput,
} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import {Images} from '../assets/';
import {Shadow} from 'react-native-shadow-2';

const LogInScreen = ({navigation, route}) => {
  const [settings, setSettings] = useState({textSize: 30});
  const [text, onChangeText] = React.useState('');

  const cyan = '#2a9d8f';

  return (
    <View style={styles.logInContainer}>
      <View class="header" style={[styles.header, {flex: 1.2}]}>
        <View class="logo_login" style={{flex: 3}}>
          <Image
            source={Images.general.logo}
            style={{
              height: 110,
              width: 110,
            }}
            resizeMode="contain"></Image>
        </View>
        <View class="title_login" style={{flex: 2, padding: 10}}>
          <Text
            style={{
              flex: 1.5,
              textAlign: 'center',
              fontSize: 30,
              color: 'black',
            }}>
            Vocat
          </Text>
          <Text
            style={{flex: 1, textAlign: 'center', fontSize: 20, color: cyan}}>
            Log In
          </Text>
        </View>
      </View>

      <View class="contents" style={[styles.contents, {flex: 2}]}>
        <View
          class="inputfields"
          style={{
            flex: 2,
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="username"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="password"
          />
        </View>
        <View
          class="submit"
          style={{
            flex: 4,
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity style={[styles.button, {width: '80%', height: 50}]}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
              }}>
              Log In
            </Text>
          </TouchableOpacity>
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
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#2a9d8f',
  },
});

export default LogInScreen;
