/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  Sofa,
  Book,
  BookmarkBook,
  HomeAltSlimHoriz,
  ProfileCircled,
} from 'iconoir-react-native';

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
import UserScreen from './src/UserScreen';

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
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            backgroundColor: isDarkMode ? '#6b6b6b' : '#FFFFFF',
            elevation: 5,
          },
        }}
        tabBarOptions={{
          showLabel: false,
          style: {
            height: 70,
            backgroundColor: isDarkMode ? '#6b6b6b' : '#FFFFFF',
            elevation: 5,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#95C3BE' : '#EFEFEF',
                  height: '100%',
                  width: '100%',
                  //   borderTopColor: '#95C3BE',
                  //   borderTopWidth: 4,
                }}>
                <Sofa
                  //   color={focused ? '#2a9d8f' : '#6b6b6b'}
                  color={focused ? 'white' : '#2A9D8F'}
                  height={23}
                  width={23}
                />
                <Text
                  style={{
                    // color: focused ? '#2a9d8f' : '#6b6b6b',
                    color: focused ? 'white' : '#2A9D8F',
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Learning"
          component={LearningScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#95C3BE' : '#EFEFEF',
                  height: '100%',
                  width: '100%',
                  //   borderTopColor: '#95C3BE',
                  //   borderTopWidth: 4,
                }}>
                <Book
                  //   color={focused ? '#2a9d8f' : '#6b6b6b'}
                  color={focused ? 'white' : '#2A9D8F'}
                  height={24}
                  width={24}
                />
                <Text
                  style={{
                    // color: focused ? '#2a9d8f' : '#6b6b6b',
                    color: focused ? 'white' : '#2A9D8F',
                  }}>
                  Learn
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Reviewing"
          component={Reviewing}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#95C3BE' : '#EFEFEF',
                  height: '100%',
                  width: '100%',
                  //   borderTopColor: '#95C3BE',
                  //   borderTopWidth: 4,
                }}>
                <BookmarkBook
                  //   color={focused ? '#2a9d8f' : '#6b6b6b'}
                  color={focused ? 'white' : '#2A9D8F'}
                  height={24}
                  width={24}
                />
                <Text
                  style={{
                    // color: focused ? '#2a9d8f' : '#6b6b6b',
                    color: focused ? 'white' : '#2A9D8F',
                  }}>
                  Review
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="My Cat"
          component={Cat}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#95C3BE' : '#EFEFEF',
                  height: '100%',
                  width: '100%',
                  //   borderTopColor: '#95C3BE',
                  //   borderTopWidth: 4,
                }}>
                <HomeAltSlimHoriz
                  //   color={focused ? '#2a9d8f' : '#6b6b6b'}
                  color={focused ? 'white' : '#2A9D8F'}
                  height={24}
                  width={24}
                />
                <Text
                  style={{
                    // color: focused ? '#2a9d8f' : '#6b6b6b',
                    color: focused ? 'white' : '#2A9D8F',
                  }}>
                  My Cat
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#95C3BE' : '#EFEFEF',
                  height: '100%',
                  width: '100%',
                  //   borderTopColor: '#95C3BE',
                  //   borderTopWidth: 4,
                }}>
                <ProfileCircled
                  //   color={focused ? '#2a9d8f' : '#6b6b6b'}
                  color={focused ? 'white' : '#2A9D8F'}
                  height={23}
                  width={23}
                />
                <Text
                  style={{
                    // color: focused ? '#2a9d8f' : '#6b6b6b',
                    color: focused ? 'white' : '#2A9D8F',
                  }}>
                  User
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
