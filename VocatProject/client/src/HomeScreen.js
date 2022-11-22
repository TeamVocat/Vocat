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
import catPile from './../assets/cat_pile.png';
import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native';
import {REACT_APP_SERVER_HOSTNAME} from '@env';

const HomeScreen = props => {
  // const isFocused = useIsFocused();

  const [user, setUser] = useState({ username: "User" });
  const [settings, setSettings] = useState({ textSize: 30 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    DeviceEventEmitter.addListener('event.changeSettings', eventData => {
      setSettings(eventData);
    });
    DeviceEventEmitter.addListener("event.changeUser", (eventData) => {
      setUser(eventData);
    });
    console.log(user);
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
    async function fetchMessage() {
      console.log(
        `Fetching Message from ${REACT_APP_SERVER_HOSTNAME}/api/home...`,
      );
      try {
        const message = await axios.get(
          `${REACT_APP_SERVER_HOSTNAME}/api/home`,
        );
        console.log(message.data);
        setMessage(message.data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessage();
  }, []);

  return (
    <View style={styles.homeContainer}>
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
            props.navigation.navigate('LogIn', {settings: settings});
          }}>
          <Text style={styles.headerButtonText}>LogIn</Text>
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
            props.navigation.navigate('Settings', {settings: settings});
          }}>
          <Text style={styles.headerButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View id="center_content" style={[styles.content]}>

        <TouchableOpacity
          style={[styles.button,]}
          onPress={() => {
            props.navigation.navigate("Signup", { settings: settings });
          }}
        >
          <Text style={styles.headerButtonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {
            top: 40,
          }]}
          onPress={() => {
            props.navigation.navigate("Signin", { settings: settings, user: user });
          }}
        >
          <Text style={styles.headerButtonText}>Signin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {
            top: 80,
          }]}
          onPress={() => {
            setUser({ username: "User" });
          }}
        >
          <Text style={styles.headerButtonText}>Signout</Text>
        </TouchableOpacity>
        <Text style={[styles.message, { fontSize: settings.textSize }]}>
          {message + user.username + "!"}
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
            props.navigation.navigate('Learning', {settings: settings});
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
            props.navigation.navigate('Progress', {settings: settings});
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
            props.navigation.navigate('CatHouse', {settings: settings});
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
