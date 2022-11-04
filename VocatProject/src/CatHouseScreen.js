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
} from "react-native";
import { Row, Rows, Table, TableWrapper } from "react-native-table-component";
import catPile from "./../assets/cat_pile.png";

const CatHouseScreen = ({ navigation, route }) => {
  const [settings, setSettings] = useState({ textSize: 30 });
  const state = {
    tableHead: ["Food", "Toys"],
    tableData: [
      ["1", "2", "3"],
      ["a", "b", "c"],
      ["1", "2", "3"],
    ],
  };

  return (
    <View style={styles.catsContainer}>
      <View id="header" style={styles.header}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              right: 15,
              top: 15,
            },
          ]}
          onPress={() => {
            navigation.navigate("Settings", { settings: settings });
          }}
        >
          <Text style={{ fontSize: 30 }}>Store</Text>
        </TouchableOpacity>
      </View>
      <View id="content" style={[styles.content]}>
        <Image
          source={catPile}
          style={{
            width: 200,
            height: 200,
          }}
        ></Image>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.tableHead}
              textStyle={styles.tableText}
            />
            <Rows data={state.tableData} textStyle={styles.tableText} />
          </Table>
        </View>
      </View>
      <View id="footer" style={[styles.footer]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              position: "absolute",
              bottom: 20,
            },
          ]}
          onPress={() => {
            navigation.navigate("Home", { settings: route.params.settings });
          }}
        >
          <Text style={{ fontSize: 30 }}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  catsContainer: {
    backgroundColor: "#FEFAE0",
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#FEFAE0",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    flex: 1,
  },
  footer: {
    width: "100%",
    backgroundColor: "#FEFAE0",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
  content: {
    width: "100%",
    height: "50%",
    top: "10%",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flex: 5,
  },
  button: {
    backgroundColor: "#CCD5AE",
    borderRadius: 20,
    padding: 10,
    position: "absolute",
  },
  headerButtonText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
  },
  tableContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  tableHead: {
    height: 50,
    width: 300,
    fontSize: 10,
    backgroundColor: "#f1f8ff",
  },
  tableText: {
    height: 50,
    fontSize: 10,
  },
});

export default CatHouseScreen;
