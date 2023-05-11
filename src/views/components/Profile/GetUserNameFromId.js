import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import COLORS from "../../../conts/colors";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const GetUserNameFromId = ({ userID }) => {
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from users where id = ?",
        [userID],
        (_, { rows }) => {
          if (rows.length > 0) {
            setUserName(rows._array[0].name);
            // console.log(rows._array[0].name);
          } else {
            console.log("-------------------------");
            console.log("Something went wrong:");
            console.log(`UserID: ${userID}`);
            console.log(`rows._array: ${rows._array[0]}`);
            console.log("-------------------------");
          }
        },
        (_, error) => {
          console.log("Error authenticating user:", error);
        }
      );
    });
  }, [userID]);

  return (
    <View>
      <Text>Здравствуйте, {userName}</Text>
    </View>
  );
};

export default GetUserNameFromId;
