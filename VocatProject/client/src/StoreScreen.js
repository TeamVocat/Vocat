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
  const [settings, setSettings] = useState({textSize: 30});
  const foods = ['food1', 'food2', 'food3', 'food4', 'food5', 'food6'];

  return (
    <View style={styles.storeContainer}>
      <View id="header" style={styles.header}>
        <Shadow
          distance={5}
          startColor={'#E6E5DAED'}
          endColor={'#FEFAE090'}
          paintInside={true}
          containerViewStyle={{margin: 100}}
          safeRender={true}
          style={{
            borderTopStartRadius: 5,
            borderRadius: 2,
          }}
          offset={[-2, 7]}>
          <TouchableOpacity
            style={[styles.button, {left: -5, top: 5}]}
            onPress={() => {
              navigation.navigate('CatHouse', {settings: settings});
            }}>
            <Text style={{fontSize: 30}}>Back</Text>
          </TouchableOpacity>
        </Shadow>
      </View>
      <View id="contents" style={styles.contents}>
        <ScrollView style={{height: 100}}>
          <View id="Foodtitle">
            <Text style={styles.titleText}>FOODS</Text>
          </View>
          <View id="Foods" style={styles.imgContainer}>
            <View key={1} style={styles.imgItemWrap}>
              <Image
                source={Images.foods.food1}
                style={{
                  height: 110,
                  width: 110,
                }}
                resizeMode="contain"></Image>
              <Text style={styles.text}>Soup</Text>
            </View>
            <View key={2} style={styles.imgItemWrap}>
              <Image
                source={Images.foods.food2}
                style={{
                  height: 110,
                  width: 110,
                }}
                resizeMode="contain"></Image>
              <Text style={styles.text}>Soup</Text>
            </View>
            <View key={3} style={styles.imgItemWrap}>
              <Image
                source={Images.foods.food3}
                style={{
                  height: 110,
                  width: 110,
                }}
                resizeMode="contain"></Image>
              <Text style={styles.text}>Soup</Text>
            </View>
            {foods.map((x, i) => {
              <View key={i} style={styles.imgItemWrap}>
                <Image
                  source={Images.foods.x}
                  style={{
                    height: 130,
                    width: 130,
                  }}
                  resizeMode="contain"></Image>
                <Text style={styles.text}>{x}</Text>
              </View>;
            })}
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
    alignItems: 'flex-start',
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
    alignSelf: 'flex-start',
    textAlign: 'center',
    backgroundColor: '#CCD5AE',
  },
  headerButtonText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
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
    fontSize: 30,
    fontStyle: 'bold',
    textAlign: 'center',
  },
});

export default StoreScreen;
