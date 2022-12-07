import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import {
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
import { Picker } from '@react-native-picker/picker';

const PlanScreen = ({ props, navigation, route }) => {
  // const [finalSize, setFinalSize] = useState(route.params.settings.textSize);
  const [settings, setSettings] = useState({});

  let data = [{ value: 'book1' }];
  //let newWords = 20;
  //let reviewWords = 30;
  const [newWords, numNewWords] = React.useState('20');
  const [oldWords, numOldWords] = React.useState('30');

  const [selectedValue, setSelectedValue] = useState('java');

  const fetchSettings = async () => {
    try {
      let temp_settings = await getSettings();
      if (temp_settings) {
        // console.log("new settings:", temp_settings);
        setSettings(temp_settings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <View style={styles.settingsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Progress');
        }}>
        <Text style={{ fontSize: 30 }}>Study Progress</Text>
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Current Book: </Text>
      <Picker
        selectedValue={selectedValue}
        // style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Book1" value="Book1" />
        <Picker.Item label="Book2" value="Book2" />
      </Picker>

      <Text style={styles.buttonLabel}>New Words Each Day:</Text>
      <TextInput
        style={styles.input}
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        value={newWords}
        onChangeText={numNewWords}
        maxLength={5}
      />

      <Text style={styles.buttonLabel}>Review Amount for Tomorrow:</Text>
      <TextInput
        style={styles.input}
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        value={oldWords}
        maxLength={5}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            position: 'absolute',
            bottom: 20,
          },
        ]}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={{ fontSize: 30 }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: '#FEFAE0',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
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
    flexWrap: 'wrap',
  },
  input: {
    backgroundColor: 'white',
    width: 60,
    margin: 12,
    borderWidth: 1,
    paddingTop: 10,
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

export default PlanScreen;
