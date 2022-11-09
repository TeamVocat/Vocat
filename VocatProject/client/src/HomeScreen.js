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
} from 'react-native';
import {Images} from '../assets/';

const HomeScreen = ({navigation, route}) => {
  const [settings, setSettings] = useState({textSize: 30});

  useEffect(() => {
    DeviceEventEmitter.addListener('event.changeSettings', eventData => {
      setSettings(eventData);
    });
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, []);

  return (
    <View style={styles.homeContainer}>
      <View id="header" style={styles.headerContainer}>
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
            navigation.navigate('Settings', {settings: settings});
          }}>
          <Text style={styles.headerButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View id="center_content" style={[styles.content]}>
        <Text style={[styles.message, {fontSize: settings.textSize}]}>
          {' '}
          Welcome, USER!
        </Text>
        <Image
          source={Images.general.catpile}
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
            navigation.navigate('Learning', {settings: settings});
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
            navigation.navigate('Progress', {settings: settings});
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
            navigation.navigate('CatHouse', {settings: settings});
          }}>
          <Text style={styles.buttonText}>My Cats</Text>
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
