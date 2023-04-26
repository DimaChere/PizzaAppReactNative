import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import * as SQLite from "expo-sqlite";
import BlockBasket from "./BlockBasket";
const db = SQLite.openDatabase("db.db");

const GetPizzaFromOrder = ({ pizzaID, count }) => {
  const [pizza, setPizza] = useState([{}]);
  //idPizza INT P K AI, pizzaImage TEXT, pizzaName TEXT, pizzaDescription TEXT,  pizzaCost INT
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from pizzaList where idPizza = ?",
        [pizzaID],
        (_, { rows }) => {
          if (rows.length > 0) {
            setPizza(rows._array[0]);
          } else {
            console.log("Something went wrong:");
          }
        },
        (_, error) => {
          console.log("Error authenticating user:", error);
        }
      );
    });
  }, [pizzaID]);

  return (
    <View>
      <BlockBasket
        key={pizza.idPizza}
        idPizza={pizza.idPizza}
        pizzaName={pizza.pizzaName}
        imgSrc={pizza.pizzaImage}
        description={pizza.pizzaDescription}
        cost={pizza.pizzaCost}
        count={count}
      />
    </View>
  );
};

export default GetPizzaFromOrder;
