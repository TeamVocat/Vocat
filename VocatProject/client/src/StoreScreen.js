import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
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
} from "react-native";
import { Row, Rows, Table, TableWrapper } from "react-native-table-component";
import catPile from "./components/cat_pile.png";
import { Shadow } from "react-native-shadow-2";

const StoreScreen = ({ navigation, route }) => {
  const [settings, setSettings] = useState({ textSize: 30 });
  const state = {
    tableHead: ["Food", "Toys"],
    tableData: [
      ["1", "2", "3"],
      ["a", "b", "c"],
      ["1", "2", "3"],
      ["a", "b", "c"],
    ],
  };

  return (
    <View style={styles.storeContainer}>
      <View id="header" style={styles.header}>
        <Shadow
          distance={5}
          startColor={"#E6E5DAED"}
          endColor={"#FEFAE090"}
          paintInside={true}
          containerViewStyle={{ margin: 100 }}
          safeRender={true}
          style={{
            borderTopStartRadius: 5,
            borderRadius: 2,
          }}
          offset={[2, 2]}
        >
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Settings", { settings: settings });
            }}
          >
            <Text style={{ fontSize: 30 }}>Store</Text>
          </TouchableOpacity>
        </Shadow>
      </View>
      <View id="table" style={styles.tableContainer}>
        <ScrollView style={{ height: 180 }}>
          <Table borderStyle={{ borderWidth: 5, borderColor: "#D3D3D3" }}>
            {state.tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                style={[
                  styles.tableRows,
                  index % 2 && { backgroundColor: "#EBEDDF" },
                ]}
                textStyle={styles.tableText}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeContainer: {
    backgroundColor: "#FEFAE0",
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  header: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "#FEFAE0",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  tableContainer: {
    width: "100%",
    paddingTop: 20,
    backgroundColor: "#DCDCDC",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flex: 8,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    alignSelf: "flex-start",
    textAlign: "center",
    backgroundColor: "#CCD5AE",
  },
  headerButtonText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
  },

  tableHead: {
    height: 40,
    backgroundColor: "#DCDCDC",
  },
  tableRows: {
    backgroundColor: "#DFE0D5",
  },
  tableText: {
    height: 50,
    fontSize: 20,
    textAlign: "center",
  },
});

export default StoreScreen;
