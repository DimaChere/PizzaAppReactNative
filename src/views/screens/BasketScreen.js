import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import COLORS from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SQLite from "expo-sqlite";
import TableFilling from "../components/pizzaList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import BlockBasket from "../components/BlockBasket";

const db = SQLite.openDatabase("db.db");
// на всякий случай
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS pizzaList (idPizza INTEGER PRIMARY KEY AUTOINCREMENT, pizzaImage TEXT, pizzaName TEXT, pizzaDescription TEXT,  pizzaCost INTEGER);",
    [],
    (_, result) => {
      console.log("Таблица меню успешно создана");
    },
    (_, error) => {
      console.log("Ошибка создания таблицы меню:", error);
    }
  );
});
// основня функция
const BasketScreen = () => {
  // очистка корзины
  const ClearAll = async () => {
    try {
      console.log("корзина очищена");
      await AsyncStorage.removeItem("@order");
    } catch (e) {}
  };
  // массив названий пицц
  let [orderList, setOrderList] = useState([]);

  const getOrder = async () => {
    try {
      const order = await AsyncStorage.getItem("@order");
      const parsedOrder = order ? JSON.parse(order) : [];
      setOrderList(parsedOrder);
    } catch (error) {}
  };

  useEffect(() => {
    getOrder();
  }, []);

  const FillBusket = () => {
    console.log("------------------------------");
    return (
      <View>
        {orderList.map((obj) => {
          pizzaBloks(obj.name, obj.count);
        })}
      </View>
    );
  };

  const pizzaBloks = async (obj, count) => {
    const [fullOrder, setFullOrder] = useState([]);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM pizzaList where pizzaName = ?",
          [obj],
          (_, { rows }) => {
            if (rows.length > 0) {
              console.log(`Добавление пиццы ${obj}`);
              console.log(rows._array[0]);
              setFullOrder(rows._array[0]);
              console.log(`fullOrder: ${fullOrder}`);
            } else {
              console.log("Таблица пицц пуста");
            }
          },
          (_, error) => {
            console.log("Error PizzaList:", error);
          }
        );
      });
    }, [obj]);
  };

  return (
    <SafeAreaView>
      <View style={styles.upperContainer}>
        <Text style={styles.contents}>Корзина</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            <FillBusket />
            <StatusBar style="auto" />
            <Button title="Очистить корзину" onPress={ClearAll} />
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
  upperContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
  },
  contents: {
    fontSize: 40,
    color: COLORS.ten,
  },
});

export default BasketScreen;
