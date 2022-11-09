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
    tableData2: [
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ],
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
          <Image
            source={Images.general.catpile}
            style={{
              width: 300,
            }}
            resizeMode="contain"></Image>
        </View>
        <View style={styles.tableContainer}>
          <Table borderStyle={{borderWidth: 0, borderColor: '#C1C0B9'}}>
            <Row
              data={state.tableHead}
              style={styles.tableHead}
              textStyle={styles.tableText}
              flexArr={[1, 2]}
            />
            <ScrollView style={{height: 180}}>
              <Table borderStyle={{borderWidth: 5, borderColor: '#D3D3D3'}}>
                {state.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    style={[
                      styles.tableRows,
                      index % 2 && {backgroundColor: '#EBEDDF'},
                    ]}
                    textStyle={styles.tableText}
                  />
                ))}
              </Table>
            </ScrollView>
          </Table>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
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
});

export default CatHouseScreen;
