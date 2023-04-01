import React from "react";
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
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from pizzaList",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            for (let i = 0; i < rows._array.length; i += 1) {
              // Не знаю как добавить
              // <Block
              //   imgSrc={rows._array[i].pizzaImage}
              //   pizzaName={rows._array[i].pizzaName}
              //   description={rows._array[i].pizzaDescription}
              //   cost={rows._array[i].pizzaCost}
              // />;
            }
          } else {
            console.log("Таблица пицц пуста, заполняем");
            TableFilling();
          }
        },
        (_, error) => {
          console.log("Error authenticating user:", error);
          Alert.alert("Ошибка");
        }
      );
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Icon
          name="food-drumstick-outline"
          style={styles.search}
          onPress={() => navigation.navigate("SearchScreen")}
        ></Icon>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            <Text>Меню</Text>
            <PizzaFilling />
            {/* {pizzaList.map((obj) => (
              <Block
                imgSrc={obj.imgSrc}
                pizzaName={obj.pizzaName}
                description={obj.description}
                cost={obj.cost}
              />
            ))} */}
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
  searchContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingTop: 30,
    paddingRight: 10,
  },
  search: {
    fontSize: 40,
    color: COLORS.ten,
  },
});

export default MenuScreen;
