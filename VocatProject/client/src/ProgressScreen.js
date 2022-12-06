import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, DeviceEventEmitter, StyleSheet, Button, Text, Alert, useColorScheme, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from "react-native-chart-kit";
import Svg, { Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Use, Defs, Stop } from 'react-native-svg';
import { retrieveProgress, storeUserLocal, getUserLocal, updateWordsPerDay } from './Functions.js';

const ProgressScreen = ({ props, navigation, route }) => {
    const [labels, setLabels] = useState(['11.1','11.2','11.3','11.4','11.5']);
    const [progresses, setProgresses] = useState([1,2,3,4,5]);
    const [wordsPerDay, setWordsPerDay] = useState('0');
    const [hasChart, setHasChart] = useState(false);

    useEffect(() => {
        async function fetchMessage() {
            try {
              const user = await getUserLocal();
              const progressArray = [];
              const dateArray = [];
              setWordsPerDay(user.wordsPerDay);
              console.log(wordsPerDay);
              if (user.lastLogInDate.length>=5){
                for (let i = 0; i < 5;i++){
                    console.log(user.lastLogInDate[user.lastLogInDate.length-1-i]);
                    const dateObj = user.lastLogInDate[user.lastLogInDate.length-1-i];
                    progressArray.unshift(dateObj.numWords);
                    dateArray.unshift(dateObj.dateString);
                }
                setProgresses(progressArray);
                setLabels(dateArray);
                setHasChart(true);
              }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessage();
    }, []);

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

    return (
        <View style={styles.settingsContainer}>
            <Text style={[styles.buttonLabel, {marginTop: 30}]}>Number of words per day:</Text>
            <TextInput
                style={[styles.input, {height: route.params.settings.textSize, fontSize: route.params.settings.textSize-10}]}
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
            <Text style={[styles.buttonLabel, {marginTop: 60}]}>
            Study 5 days to see progress chart!
            </Text>
            }
        </View >
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
});

export default ProgressScreen;
