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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
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
import Reviewing from './src/ReviewingScreen';

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="Register" component={SignUpScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
    </Stack.Navigator>
  );
}

function User() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
    </Stack.Navigator>
  );
}

function Cat() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CatHouse" component={CatHouseScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
    </Stack.Navigator>
  );
}

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
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen name="Learning" component={LearningScreen} />
        <Tab.Screen name="Reviewing" component={Reviewing} />

        <Tab.Screen name="My Cat" component={Cat} />

        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
