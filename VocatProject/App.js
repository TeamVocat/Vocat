/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { TouchableOpacity, DeviceEventEmitter, StyleSheet, Button, SafeAreaView, Text, Alert, useColorScheme, View, } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


/**
 * Components
 */
import HomeScreen from './src/HomeScreen.js';
import SettingsScreen from './src/SettingsScreen.js';


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
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
