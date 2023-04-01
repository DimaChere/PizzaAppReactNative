import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import COLORS from "../../conts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

function Items() {
  const [UserInfo, SetUserInfo] = React.useState(null);
  getMyStringValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_User");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }

    console.log("Done.");
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users where id = ?",
        [getMyStringValue()],
        (_, { rows: { _array } }) => {
          SetUserInfo(_array);
          console.log(_array);
        }
      );
    });
  }, []);

  return (
    <View>
      {UserInfo.map(({ obj }) => (
        <Text>{obj}</Text>
      ))}
    </View>
  );
}

const UserScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.nameContainer}>
        <Items />
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            <Text>Меню</Text>
            <StatusBar style="auto" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.sixty,
  },
  scroll: {
    marginBottom: 80,
  },
  mainScreen: {
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: "black",
  },
  nameContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingRight: 10,
  },
  search: {
    fontSize: 40,
    color: COLORS.ten,
  },
});

export default UserScreen;
