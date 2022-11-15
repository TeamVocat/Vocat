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
  ScrollView,
  Pressable,
} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import {Images} from '../assets/';
import {Shadow} from 'react-native-shadow-2';

const CatHouseScreen = ({navigation, route}) => {
  const [settings, setSettings] = useState({textSize: 30});
  const state = {
    tableHead: ['Food', 'Toys & Decorations'],
    tableData: [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c'],
    ],
  };
  const [catState, setCatState] = useState('lying');
  const sleepClick = () => {
    setCatState('sleeping');
  };
  const waterClick = () => {
    setCatState('drinking');
  };
  const catClick = () => {
    setCatState('lying');
  };
  const showCat = () => {
    return (
      <Pressable onPress={catClick}>
        <Image
          source={Images.actions[catState]}
          style={{
            width: 300,
          }}
          resizeMode="contain"></Image>
      </Pressable>
    );
  };

  const [ItemState, setItemState] = useState('foods');
  const foods = ['food1', 'food2', 'food3', 'food4', 'food5', 'food6'];
  const toys = ['food4', 'food5', 'food6', 'food1', 'food2', 'food3'];

  const foodClick = () => {
    setItemState('foods');
  };
  const toyClick = () => {
    setItemState('toys');
  };

  const showTable = () => {
    if (ItemState === 'foods') {
      return (
        <View id="Foods" style={styles.imgContainer}>
          {foods.map((x, i) => (
            <View key={i} style={styles.imgItemWrap}>
              <Image
                source={Images.foods[x]}
                style={{
                  height: 110,
                  width: 110,
                }}
                resizeMode="contain"></Image>
            </View>
          ))}
        </View>
      );
    } else if (ItemState === 'toys') {
      return (
        <View id="Toys" style={styles.imgContainer}>
          {toys.map((x, i) => (
            <View key={i} style={styles.imgItemWrap}>
              <Image
                source={Images.foods[x]}
                style={{
                  height: 110,
                  width: 110,
                }}
                resizeMode="contain"></Image>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.catsContainer}>
      <View id="header" style={styles.header}>
        <Shadow
          distance={5}
          startColor={'#E6E5DAED'}
          endColor={'#FEFAE090'}
          paintInside={true}
          safeRender={true}
          style={{
            borderTopStartRadius: 5,
            borderRadius: 2,
          }}
          offset={[-10, 13]}>
          <TouchableOpacity
            style={[styles.button, {top: 10, right: 15}]}
            onPress={() => {
              navigation.navigate('Store', {settings: settings});
            }}>
            <Text style={{fontSize: 30}}>Store</Text>
          </TouchableOpacity>
        </Shadow>
      </View>
      <View id="content" style={[styles.content]}>
        <View
          id="cats"
          style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
          {showCat()}
        </View>
        <View id="controls" style={{flex: 0.8, flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.controlBotton]} onPress={sleepClick}>
            <Text style={{fontSize: 20}}>Sleep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBotton]} onPress={waterClick}>
            <Text style={{fontSize: 20}}>Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBotton]} onPress={foodClick}>
            <Text style={{fontSize: 20}}>Foods</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBotton]} onPress={toyClick}>
            <Text style={{fontSize: 20}}>Toys</Text>
          </TouchableOpacity>
        </View>
        <View id="table" style={[styles.tableContainer]}>
          <ScrollView style={{height: 100}}>{showTable()}</ScrollView>
        </View>
      </View>
      <View id="footer" style={[styles.footer]}>
        <Shadow
          distance={7}
          tartColor={'#E6E5DA40'}
          endColor={'#DCDCDC05'}
          paintInside={true}
          containerViewStyle={{margin: 100}}
          safeRender={true}
          style={{
            borderTopStartRadius: 5,
            borderRadius: 2,
          }}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              navigation.navigate('Home', {settings: route.params.settings});
            }}>
            <Text style={{fontSize: 30}}>Home</Text>
          </TouchableOpacity>
        </Shadow>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  catsContainer: {
    backgroundColor: '#FEFAE0',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#FEFAE0',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    flex: 8,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 7,
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
  tableContainer: {
    width: '100%',
    height: '100%',
    flex: 3,
    paddingTop: 20,
    backgroundColor: '#DCDCDC',
  },
  tableHead: {
    height: 40,
    backgroundColor: '#DCDCDC',
  },
  tableRows: {
    backgroundColor: '#DFE0D5',
  },
  tableText: {
    height: 50,
    fontSize: 20,
    textAlign: 'center',
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
  controlBotton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 0,
    margin: 5,
    alignSelf: 'flex-start',
    textAlign: 'center',
    backgroundColor: '#CCD5AE',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default CatHouseScreen;
