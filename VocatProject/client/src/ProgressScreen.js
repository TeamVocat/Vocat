import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
  StyleSheet,
  Button,
  Text,
  Alert,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LineChart} from 'react-native-chart-kit';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop,
} from 'react-native-svg';
import {retrieveProgress} from './Functions.js';

const date = '11/1';
const wordsNotLearned = 870;

const ProgressScreen = ({props, navigation, route}) => {
  const [labels, setLabels] = useState([
    '11.1',
    '11.2',
    '11.3',
    '11.4',
    '11.5',
  ]);
  const [progresses, setProgresses] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    async function fetchMessage() {
      try {
        let progressArray = await retrieveProgress();
        progressArray = progressArray.slice(progressArray.length - 6);
        setProgresses(progressArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessage();
  }, []);

  let data = [{value: 'book1'}];
  //let newWords = 20;
  //let reviewWords = 30;
  const [newWords, numNewWords] = React.useState('20');
  const [oldWords, numOldWords] = React.useState('30');
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => 'black',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };
  const screenWidth = Dimensions.get('window').width;
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

  return (
    <View style={styles.settingsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Plan');
        }}>
        <Text style={{fontSize: 30}}>Study Plan</Text>
      </TouchableOpacity>

      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />

      <Text style={styles.buttonLabel}>Number of words learned:</Text>
      <Text style={styles.buttonLabel}>
        {progresses[progresses.length - 1]}
      </Text>

      <Text style={styles.buttonLabel}>Number of words to be learned:</Text>
      <Text style={styles.buttonLabel}>{wordsNotLearned}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
  },
  buttonLabel: {
    alignItems: 'flex-start',
    marginTop: 30,
    fontSize: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#CCD5AE',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  message: {
    marginTop: '30%',
    marginBottom: 20,
  },
});

export default ProgressScreen;
