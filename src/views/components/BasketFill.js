import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BlockBasket from "./BlockBasket";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = SQLite.openDatabase("db.db");

export default function BasketFill() {
  const [pizzaNameList, setPizzaNameList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);

  //   const getPizzaList = async () => {
  //     try {
  //       const order = await AsyncStorage.getItem("@order");
  //       setPizzaNameList(order);
  //     } catch (e) {
  //       // read error
  //     }
  //   };

  useEffect(() => {
    if (AsyncStorage.getItem("@order") !== undefined) {
      AsyncStorage.getItem("@order").then((value) => setPizzaNameList(value));
      const order = pizzaNameList;
      order.map((obj) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * from pizzaList WHERE pizzaName = ?",
            [obj],
            (_, { rows }) => {
              if (rows.length > 0) {
                console.log(rows._array);
                setPizzaList(rows._array);
              } else {
                console.log("Список пицц пуст");
              }
            }
          );
        });
      });
    } else {
      console.log("заказ - undefined");
    }
  }, []);

  return (
    <View>
      {pizzaList.map((pizza) => {
        <BlockBasket
          imgSrc={pizza.pizzaImage}
          pizzaName={pizza.pizzaName}
          cost={pizza.pizzaCost}
        />;
      })}
    </View>
  );
}
