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
  TextInput,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import axios from 'react-native-axios';
import {REACT_APP_SERVER_HOSTNAME} from '@env';
import {
  storeSettings,
  getSettings,
  clearUserLocal,retrieveProgress, storeUserLocal, getUserLocal, updateWordsPerDay
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

  const [labels, setLabels] = useState(['11.1','11.2','11.3','11.4','11.5']);
  const [progresses, setProgresses] = useState([1,2,3,4,5]);
  const [wordsPerDay, setWordsPerDay] = useState('0');
  const [hasChart, setHasChart] = useState(false);

  const username = 'username';

  let data = [{ value: 'book1' }];
  //let newWords = 20;
  //let reviewWords = 30;
  const [newWords, numNewWords] = React.useState('0');
  const [oldWords, numOldWords] = React.useState('0');
  const chartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => 'black',
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5
  };
  const screenWidth = Dimensions.get("window").width;
  const chartData = {
      labels: labels,
      datasets: [
          {
              data: progresses,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
          }
      ],
      legend: ["Words Learned"] // optional
  };

  useEffect(() => {
      async function fetchMessage() {
          try {
            console.log('called');
            const user = await getUserLocal();
            const progressArray = [];
            const dateArray = [];
            setWordsPerDay(user.wordsPerDay);
            console.log(wordsPerDay);
            //5 days
            // user.lastLogInDate = [{"dateString": "12/01", "numWords": 5},{"dateString": "12/02", "numWords": 10},
            // {"dateString": "12/03", "numWords": 15},{"dateString": "12/04", "numWords": 20},
            // {"dateString": "12/05", "numWords": 25}]
            //1 day
            //user.lastLogInDate = [{"dateString": "12/01", "numWords": 5}];
              for (let i = 0; i < 5;i++){
                  console.log(user.lastLogInDate[user.lastLogInDate.length-1-i]);
                  const dateObj = user.lastLogInDate[user.lastLogInDate.length-1-i];
                  progressArray.unshift(dateObj.numWords);
                  dateArray.unshift(dateObj.dateString);
              }
              setProgresses(progressArray);
              setLabels(dateArray);
              if (user.lastLogInDate.length >= 2){
                setHasChart(true);
              }
          } catch (error) {
              console.log(error);
          }
      };
      fetchMessage();
  }, []);

  const FirstRoute = () => (
  <ScrollView>
    <View style={styles.settingsContainer}>
        <Text style={[styles.buttonLabel, {marginTop: 30}]}>Number of words per day:</Text>
        <TextInput
            style={[styles.input, {height:30, fontSize: 20
              //height: route.params.settings.textSize, fontSize: route.params.settings.textSize-10
            }]}
            editable
            placeholder= {wordsPerDay+''}
            onChangeText= {
              async (input) => {await updateWordsPerDay(input);}
            }
            maxLength={4}
        />

        <Text style={[styles.buttonLabel, {marginTop: 30}]}>Number of words learned:</Text>
        <Text style={styles.buttonLabel}>{progresses[4]}</Text>

        <Text style={[styles.buttonLabel, {marginTop: 30}]}>Number of words to be learned:</Text>
        <Text style={styles.buttonLabel}>{1066-progresses[4]}</Text>

        { hasChart == true &&
        <LineChart
            style={{marginTop: 30}}
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
        />
        }
        { hasChart == false &&
        <Text style={[styles.buttonLabel, {marginTop: 30}]}>Words learned on {labels[0]}:</Text>
        }
        { hasChart == false &&
        <Text style={styles.buttonLabel}>{progresses[0]}</Text>
        }
        { hasChart == false &&
        <Text style={styles.buttonLabel}>Learn more days to see progress chart!</Text>
        }
    </View >
    </ScrollView>
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
  settingsContainer: {
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center'
  },
  buttonText: {
      fontSize: 30
  },
  buttonLabel: {
      alignItems: 'flex-start',
      fontSize: 20,
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  button: {
      backgroundColor: '#CCD5AE',
      borderRadius: 10,
      padding: 5,
      alignItems: 'center',
      marginBottom: 10,
  },
  headerContainer: {
      flexDirection: 'row'
  },
  message: {
      marginTop: '30%',
      marginBottom: 20,
  },
  input: {
      backgroundColor: 'white',
      width: 60,
      borderWidth: 1,
      padding: 0,
      textAlign: 'center'
  },
  text: {
    fontSize: 20,
  },
});

export default UserScreen;