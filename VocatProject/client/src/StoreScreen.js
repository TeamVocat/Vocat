import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
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
  ScrollView,
} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import {Images} from '../assets/';
import {Shadow} from 'react-native-shadow-2';

const StoreScreen = ({navigation, route}) => {
  const [user, setUser] = useState({});

  const fetchSettingsUser = async () => {
    console.log(
        `Fetching Settings and User from local storage...`,
    );
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
        };
    } catch (error) {
        console.log(error);
    }
};
  const [settings, setSettings] = useState({textSize: 30});
  const [coins, Setcoins] = useState(user.coinNum);
  const foods = ['food1', 'food2', 'food3', 'food4', 'food5', 'food6'];
  const toys = ['food1', 'food2', 'food3', 'food4', 'food5', 'food6'];

  const buyItem = () => Setcoins(user.coinNum - 20);

  return (
    <View style={styles.storeContainer}>
      <View id="header" style={styles.header}>
        <TouchableOpacity
          style={[styles.button, {left: -25, top: -10, margin: 10}]}
          onPress={() => {
            navigation.navigate('CatHouse', {settings: settings});
          }}>
          <Text style={{fontSize: 30}}>{'👈Back'}</Text>
        </TouchableOpacity>

        <View id="coins" style={[styles.coinsContainer, {left: 60, top: 5}]}>
          <Image
            source={Images.general.catcoin}
            style={{
              height: 55,
              width: 55,
            }}
            resizeMode="contain"></Image>
          <Text style={{fontSize: 30, margin: 5}}>{user.coinNum}</Text>
        </View>
      </View>
      <View id="contents" style={styles.contents}>
        <ScrollView style={{height: 100}}>
          <View id="Foodtitle">
            <Text style={styles.titleText}>Foods</Text>
          </View>
          <View id="Foods" style={styles.imgContainer}>
            {foods.map((x, i) => (
              <View key={i} style={styles.imgItemWrap}>
                <TouchableOpacity onPress={buyItem}>
                <Image
                  source={Images.foods[x]}
                  style={{
                    height: 110,
                    width: 110,
                  }}
                  resizeMode="contain"></Image></TouchableOpacity>
                <Text style={styles.text}>{Images.foodtitles[x]}</Text>
              </View>
            ))}
          </View>
          <View id="Toytitle">
            <Text style={styles.titleText}>Toys</Text>
          </View>
          <View id="Toys" style={styles.imgContainer}>
            {toys.map((x, i) => (
              <View key={i} style={styles.imgItemWrap}>
                <TouchableOpacity onPress={buyItem}>
                <Image
                  source={Images.foods[x]}
                  style={{
                    height: 110,
                    width: 110,
                  }}
                  resizeMode="contain"></Image></TouchableOpacity>
                <Text style={styles.text}>{Images.foodtitles[x]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeContainer: {
    backgroundColor: '#FEFAE0',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    marginTop: 10,
    backgroundColor: '#FEFAE0',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contents: {
    width: '100%',
    paddingTop: 20,
    backgroundColor: '#DCDCDC',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center',
    flex: 6,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#CCD5AE',
  },
  headerButtonText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
  },
  coinsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 200,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DCDCDC',
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imgItemWrap: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    margin: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 40,
    fontStyle: 'bold',
    textAlign: 'center',
  },
});

export default StoreScreen;
