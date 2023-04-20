import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import COLORS from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SQLite from "expo-sqlite";
import TableFilling from "../components/pizzaList";
import Block from "../components/Block";

const db = SQLite.openDatabase("db.db");

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

const MenuScreen = ({ navigation }) => {
  const PizzaFilling = () => {
    const [pizzaList, setPizzaList] = useState([]);
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * from pizzaList",
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              setPizzaList(rows._array);
            } else {
              console.log("Таблица пицц пуста, заполняем");
              TableFilling();
            }
          },
          (_, error) => {
            console.log("Error PizzaList:", error);
            Alert.alert("Ошибка");
          }
        );
      });
    }, []);

    return (
      <View>
        {pizzaList.map((pizza) => (
          <Block
            key={pizza.idPizza}
            idPizza={pizza.idPizza}
            imgSrc={pizza.pizzaImage}
            pizzaName={pizza.pizzaName}
            description={pizza.pizzaDescription}
            cost={pizza.pizzaCost}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.upperContainer}>
        <Text style={styles.contents}>Меню</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}> 
            <PizzaFilling />
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
  upperContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
  },
  search: {
    fontSize: 40,
    color: COLORS.ten,
  },
  contents: {
    fontSize: 40,
    color: COLORS.ten,
  },
});

export default MenuScreen;
