/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

/**
 * Components
 */

import HomeScreen from './src/HomeScreen.js';
import SettingsScreen from './src/SettingsScreen.js';
import LearningScreen from './src/LearningScreen.js';
import LearnNewScreen from './src/LearnNewScreen.js';
import PlanScreen from './src/PlanScreen.js';
import ProgressScreen from './src/ProgressScreen.js';
import CatHouseScreen from './src/CatHouseScreen.js';
import StoreScreen from './src/StoreScreen.js';
import LogInScreen from './src/LogInScreen.js';
import SignUpScreen from './src/SignUpScreen.js';
import Signup from './src/SignUp';
import Signin from './src/SignIn';
import User from './src/UserScreen';

/**
 * App.js will be used for navigating between pages
 */
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // setSettings({
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   textSize: 10
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Plan" component={PlanScreen} />
        <Stack.Screen name="Learning" component={LearningScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="CatHouse" component={CatHouseScreen} />
        <Stack.Screen name="LearnNew" component={LearnNewScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Register" component={SignUpScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
