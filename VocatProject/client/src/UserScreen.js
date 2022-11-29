import React, {useEffect, useState} from 'react';
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
import Svg, {Path} from 'react-native-svg';
import {
  BookmarkBook,
  Book,
  HomeSimpleDoor,
  ProfileCircled,
} from 'iconoir-react-native';

import {Images} from '../assets/';

const UserScreen = ({navigation, route}) => {
  const cyan = '#4DA197';
  const lightCyan = '#95C3BE';
  const gray = '#EFEFEF';

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <View
        class="header"
        style={{
          flex: 2,
          width: '100%',
          backgroundColor: cyan,
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>

      <View class="contents" style={{flex: 3}}></View>

      <View
        class="NavFooter"
        style={{
          width: '100%',
          height: 80,
          backgroundColor: lightCyan,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            flex: 1,
            height: 75,
            backgroundColor: gray,
            borderRightWidth: 1,
            borderRightColor: cyan,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <BookmarkBook color={cyan} height={26} width={26} />
          </View>
          <Text style={{color: cyan, fontSize: 18}}>Review</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 75,
            backgroundColor: gray,
            borderRightWidth: 1,
            borderRightColor: cyan,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Book color={cyan} height={26} width={26} />
          </View>
          <Text style={{color: cyan, fontSize: 18}}>Learn</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 75,
            backgroundColor: gray,
            borderRightWidth: 1,
            borderRightColor: cyan,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <HomeSimpleDoor color={cyan} height={26} width={26} />
          </View>
          <Text style={{color: cyan, fontSize: 18}}>My Cat</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 75,
            backgroundColor: cyan,
            borderRightWidth: 1,
            borderRightColor: cyan,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <ProfileCircled color={gray} height={26} width={26} />
          </View>
          <Text style={{color: gray, fontSize: 18}}>User</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
