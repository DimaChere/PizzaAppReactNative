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

const db = SQLite.openDatabase("db.db");

const UserScreen = () => {
  const [UserInfo, SetUserInfo] = React.useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  getMyStringValue = async () => {
    try {
      return await AsyncStorage.getItem("@storage_User");
    } catch (e) {
      // read error
    }

    console.log("Done.");
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM users", [], (_, { rows }) => {
        console.log(rows);
      });
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.nameContainer}>
        <Text>{UserInfo}</Text>
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
