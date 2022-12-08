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
import {getSettings, getUserLocal, storeUserLocal} from './Functions.js';
import {NavArrowLeft} from 'iconoir-react-native';

const StoreScreen = ({navigation, route}) => {
  const [user, setUser] = useState({});
  const [coins, setCoins] = useState(user.coinNum);
  const foods = ['food1', 'food2', 'food3', 'food4', 'food5', 'food6'];
  const toys = ['toy1', 'toy2', 'toy3', 'toy4', 'toy5', 'toy6'];

  const fetchUser = async () => {
    console.log(`Fetching User from local storage...`);
    try {
      let temp_user = await getUserLocal();
      if (temp_user) {
        // console.log("new user:", temp_user);
        setUser(temp_user);
        setCoins(temp_user.coinNum);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUser();
      // alert('Refreshed');
    });
    return unsubscribe;
  }, [navigation]);

  const buyItem = (item, index) => {
    if (coins > 20) {
      console.log('Buying ' + item + ' ' + index);
      let temp_arr;
      if (item === 'food') {
        temp_arr = user.foods;
        temp_arr[index]++;
        storeUserLocal({
          ...user,
          foods: temp_arr,
        });
      } else {
        temp_arr = user.toys;
        temp_arr[index]++;
        storeUserLocal({
          ...user,
          toys: temp_arr,
        });
      }
      let newCoins = coins - 20;
      storeUserLocal({
        ...user,
        coinNum: newCoins,
      });
      setCoins(newCoins);
    }
  };

  return (
    <View style={styles.storeContainer}>
      <View id="header" style={styles.header}>
        <TouchableOpacity
          style={{
            backgroundColor: '#95C3BE',
            margin: 10,
            padding: 5,
            borderRadius: 100,
            left: -60,
          }}
          onPress={() => {
            navigation.navigate('CatHouse');
          }}>
          {/* <Text style={{fontSize: 30}}>{'👈Back'}</Text> */}
          <NavArrowLeft color="black" height={25} width={25} style={{}} />
        </TouchableOpacity>
        <Text style={{fontSize: 35, color: 'white', left: -40, top: -1}}>
          Store
        </Text>
        <View id="coins" style={[styles.coinsContainer, {left: 30, top: 12}]}>
          <Image
            source={Images.general.catcoin}
            style={{
              height: 55,
              width: 55,
            }}
            resizeMode="contain"></Image>
          <Text style={{fontSize: 30, margin: 5, top: 2}}>{coins}</Text>
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
                <TouchableOpacity
                  onPress={() => {
                    buyItem('food', i);
                  }}>
                  <Image
                    source={Images.foods[x]}
                    style={{
                      height: 110,
                      width: 110,
                    }}
                    resizeMode="contain"></Image>
                </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => {
                    buyItem('toy', i);
                  }}>
                  <Image
                    source={Images.toys[x]}
                    style={{
                      height: 110,
                      width: 110,
                    }}
                    resizeMode="contain"></Image>
                </TouchableOpacity>
                <Text style={styles.text}>{Images.toytitles[x]}</Text>
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
    backgroundColor: '#2A9D8F',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#2A9D8F',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
    fontSize: 18,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 40,
    fontStyle: 'bold',
    textAlign: 'center',
  },
});

export default StoreScreen;
