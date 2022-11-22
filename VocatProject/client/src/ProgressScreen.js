import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, DeviceEventEmitter, StyleSheet, Button, Text, Alert, useColorScheme, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from "react-native-chart-kit";
import Svg, { Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Use, Defs, Stop } from 'react-native-svg';

const date = "11/1";
const wordsLearned = 130;
const wordsNotLearned = 870;

const ProgressScreen = ({ props, navigation, route }) => {
    const [finalSize, setFinalSize] = useState(route.params.settings.textSize);

    let data = [{ value: 'book1' }];
    //let newWords = 20;
    //let reviewWords = 30;
    const [newWords, numNewWords] = React.useState('20');
    const [oldWords, numOldWords] = React.useState('30');
    const chartConfig = {
        backgroundGradientFrom: '#FEFAE0',
        backgroundGradientTo: '#FEFAE0',
        color: (opacity = 1) => 'black',
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
    };
    const screenWidth = Dimensions.get("window").width;
    const chartData = {
        labels: ["11/1", "11/2", "11/3", "11/4", "11/5", "11/6"],
        datasets: [
            {
                data: [20, 45, 55, 80, 99, 130],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Words Learned"] // optional
    };

    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    navigation.navigate('Plan', { settings: route.params.settings });
                }}>
                <Text style={{ fontSize: 30 }}>Study Plan</Text>
            </TouchableOpacity>

            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />

            <Text style={styles.buttonLabel}>Number of words learned:</Text>
            <Text style={styles.buttonLabel}>{wordsLearned}</Text>

            <Text style={styles.buttonLabel}>Number of words to be learned:</Text>
            <Text style={styles.buttonLabel}>{wordsNotLearned}</Text>

            <TouchableOpacity style={[styles.button, {
                position: 'absolute',
                bottom: 20
            }]}
                onPress={() => {
                    navigation.navigate('Home', { settings: route.params.settings });
                }}>
                <Text style={{ fontSize: 30 }}>Home</Text>
            </TouchableOpacity>
        </View >
    );
};


const styles = StyleSheet.create({
    settingsContainer: {
        backgroundColor: '#FEFAE0',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center'
    },
    // sliderContainer: {
    //     width: '100%',
    //     flexDirection: 'row'
    // },
    picker: {
        backgroundColor: '#FFFFFF',
        width: '50%',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    input: {
        backgroundColor: 'white',
        width: 60,
        margin: 12,
        borderWidth: 1,
        paddingTop: 10
    },
    buttonText: {
        fontSize: 30
    },
    buttonLabel: {
        alignItems: 'flex-start',
        marginTop: 30,
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
    }
});

export default ProgressScreen;