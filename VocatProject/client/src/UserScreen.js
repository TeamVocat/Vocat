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
  Pressable,
  ScrollView,
  SectionList,
  useWindowDimensions,
} from 'react-native';
import axios from 'react-native-axios';
import {REACT_APP_SERVER_HOSTNAME} from '@env';
import {
  storeSettings,
  getSettings,
  getUserLocal,
  clearUserLocal,
} from './Functions.js';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Images} from '../assets/';
import {LineChart} from 'react-native-chart-kit';

const UserScreen = ({navigation, route}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Progress'},
    {key: 'second', title: 'Settings'},
  ]);

  const [user, setUser] = useState({});
  const [settings, setSettings] = useState({textSize: 30, wordList: 'English'});

  const username = 'username';

  const [labels, setLabels] = useState([
    '11.1',
    '11.2',
    '11.3',
    '11.4',
    '11.5',
  ]);
  const [progresses, setProgresses] = useState([1, 2, 3, 4, 5]);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => 'black',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: progresses,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Words Learned'], // optional
  };

  //   const fetchSettingsUser = async () => {
  //     console.log(`Fetching Settings and User from local storage...`);
  //     try {
  //       let temp_settings = await getSettings();
  //       if (temp_settings) {
  //         console.log('new settings:', temp_settings);
  //         setSettings(temp_settings);
  //       }
  //       let temp_user = await getUserLocal();
  //       if (temp_user) {
  //         console.log('new user:', temp_user);
  //         setUser(temp_user);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchSettingsUser();
  //   }, []);

  const FirstRoute = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LineChart
        data={chartData}
        width={layout.width * 0.9}
        height={200}
        chartConfig={chartConfig}
        style={{margin: 10, left: -10}}
      />

      <Text
        style={[
          styles.text,
          {alignSelf: 'flex-start', left: '10%', margin: 5},
        ]}>
        Number of words learned: {500}
      </Text>

      <Text
        style={[
          styles.text,
          {alignSelf: 'flex-start', left: '10%', margin: 5},
        ]}>
        Number of words to be learned: {300}
      </Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}}>
      <Text style={{fontSize: 50}}>Settings</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({route, focused, color}) => (
        <Text style={{color: '#2A9D8F', fontSize: 16, margin: 4}}>
          {route.title}
        </Text>
      )}
      style={{
        backgroundColor: '#EFEFEF',
      }}
      indicatorStyle={{
        backgroundColor: '#2A9D8F',
        height: 2,
      }}
      indicatorContainerStyle={{width: '50%', left: '13%', right: '13%'}}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.4,
          height: '100%',
          width: '100%',
          backgroundColor: '#2A9D8F',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={Images.logos.profile_background}
          style={{
            height: 90,
            width: 90,
          }}
          resizeMode="contain"
        />
        <Text style={{fontSize: 25, color: '#EFEFEF'}}>{username}</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default UserScreen;
