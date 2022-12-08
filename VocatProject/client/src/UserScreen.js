import React, { useEffect, useState } from 'react';
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
  Dimensions,
  TextInput,
} from 'react-native';
import axios from 'react-native-axios';
import { REACT_APP_SERVER_HOSTNAME } from '@env';
import {
  storeSettings,
  getSettings,
  getUserLocal,
  clearUserLocal,
} from './Functions.js';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Images } from '../assets/';
import { LineChart } from 'react-native-chart-kit';
import SettingsScreen from './SettingsScreen';
import SelectDropdown from 'react-native-select-dropdown';
import Slider from '@react-native-community/slider';
import { FontSize, Language } from 'iconoir-react-native';

const UserScreen = ({ navigation, route }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'progress', title: 'Progress' },
    { key: 'settings', title: 'Settings' },
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
            user.lastLogInDate = [{"dateString": "12/01", "numWords": 5},{"dateString": "12/02", "numWords": 10},
            {"dateString": "12/03", "numWords": 15},{"dateString": "12/04", "numWords": 20},
            {"dateString": "12/05", "numWords": 25}]
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

  const [finalSize, setFinalSize] = useState();

  const fetchSettingsUser = async () => {
    console.log(`Fetching Settings and User from local storage...`);
    try {
      let temp_settings = await getSettings();
      if (temp_settings) {
        // console.log("new settings:", temp_settings);
        setSettings(temp_settings);
        setFinalSize(temp_settings.textSize);
      }
      let temp_user = await getUserLocal();
      if (temp_user) {
        // console.log("new user:", temp_user);
        setUser(temp_user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSettingsUser();
      // alert('Refreshed');
    });
    return unsubscribe;
  }, []);

  const ProgressRoute = () => (
    <ScrollView>
      <View style={styles.settingsContainer}>
          <Text style={[styles.buttonLabel, {marginTop: 30}]}>Number of words per day:</Text>
          <TextInput
              style={[styles.input, {height:50, fontSize: 20
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

  const SettingsRoute = () => {

    const handleSync = async () => {
      setSettings({
        ...settings,
        textSize: finalSize,
      });
      try {
        await storeSettings({
          ...settings,
          textSize: finalSize,
        });
      } catch (err) {
        console.log('Settings could not be stored locally', err);
      }
      try {
        // console.log(user);
        await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/updateUser`, { user });
        alert('Successfully Synced User to Database');
      } catch (err) {
        console.log('Could not update user', err);
      }
    };

    const handleSettings = async () => {
      setSettings({
        ...settings,
        textSize: finalSize,
      });
      try {
        await storeSettings({
          ...settings,
          textSize: finalSize,
        });
        alert("Changed settings!");
      } catch (err) {
        console.log('Settings could not be stored locally', err);
      }
    };

    function style(options) {
      return {
        fontSize: options.textSize,
      };
    }

    const languages = ['English', 'German', 'Spanish'];

    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView style={{ width: '100%', heigh: '100%' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View
              class={'font size'}
              style={{
                flex: 2,
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 40,
                  left: 15,
                  top: 20,
                }}>
                <Text style={{ color: '#AAAAAA', fontSize: 14 }}>
                  Personalize
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 50,
                  width: '100%',
                  backgroundColor: '#EFEFEF',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <FontSize
                  color="black"
                  height={25}
                  width={25}
                  style={{ marginHorizontal: 10, top: 2, left: 10 }}
                />
                <Text style={{ fontSize: 20, color: 'black', left: 10 }}>
                  Font Size
                </Text>
                <TouchableOpacity
                  style={[styles.button, { left: 180 }]}
                  onPress={handleSettings}>
                  <Text style={{ fontSize: 20 }}>Done</Text>
                </TouchableOpacity>
              </View>
              <Slider
                id="fontSizeSlider"
                minimumValue={15}
                maximumValue={50}
                step={1}
                value={finalSize}
                onValueChange={value => setFinalSize(value)}
                style={{
                  backgroundColor: 'white',
                  height: 50,
                  width: '100%',
                  padding: 10,
                }}
              />
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 20,
                  borderBottomColor: '#D9D9D9',
                  borderBottomWidth: 1,
                }}>
                <Text style={style(settings)}>Text fontSize: {finalSize}</Text>
              </View>
            </View>
            <View
              class={'language menu'}
              style={{ flex: 1, width: '100%', marginBottom: 20 }}>
              <View
                style={{
                  width: '100%',
                  height: 40,
                  left: 15,
                  top: 20,
                }}>
                <Text style={{ color: '#AAAAAA', fontSize: 14 }}>Learning</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 50,
                  width: '100%',
                  backgroundColor: '#EFEFEF',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Language
                  color="black"
                  height={25}
                  width={25}
                  style={{ marginHorizontal: 10, top: 1, left: 10 }}
                />
                <Text style={{ fontSize: 20, color: 'black', top: -1, left: 10 }}>
                  Language
                </Text>
              </View>
              <SelectDropdown
                data={languages}
                defaultValueByIndex={0}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: '100%',
                  height: 50,
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                  borderBottomColor: '#D9D9D9',
                }}
              />
            </View>
            <View
              class={'buttons'}
              style={{
                flex: 0.5,
                margin: 5,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={[
                  styles.bigButton,
                  { backgroundColor: '#2A9D8F', margin: 10 },
                ]}
                onPress={async () => {
                  await handleSync();
                  // navigation.navigate('Welcome');
                }}>
                <Text style={{ fontSize: 23, color: 'white' }}>Sync</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bigButton,
                  { backgroundColor: '#D9D9D9', margin: 10 },
                ]}
                onPress={() => {
                  clearUserLocal();
                  navigation.navigate('LogIn');
                }}>
                <Text style={{ fontSize: 23 }}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderScene = SceneMap({
    progress: ProgressRoute,
    settings: SettingsRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: '#2A9D8F', fontSize: 16, margin: 4 }}>
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
      indicatorContainerStyle={{ width: '50%', left: '13%', right: '13%' }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
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
        <Text style={{ fontSize: 25, color: '#EFEFEF' }}>{user.username}</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
  },
  settingsContainer: {
    alignItems: 'center',
  },
  // sliderContainer: {
  //     width: '100%',
  //     flexDirection: 'row'
  // },
  bigButton: {
    alignItems: 'center',
    width: 160,
    height: 50,
    color: 'white',
    padding: 5,
    borderRadius: 15,
    margin: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
  },
  button: {
    backgroundColor: '#EFEFEF',
    margin: 5,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  message: {
    marginTop: '30%',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;