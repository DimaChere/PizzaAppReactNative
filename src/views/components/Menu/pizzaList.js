import React from "react";
import {} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const TableFilling = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO pizzaList ( pizzaImage, pizzaName, pizzaDescription, pizzaCost) VALUES ('https://eda.ru/img/eda/c620x415/s1.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg', 'Пепперони', 'Традиционная и всеми любимая пицца с пепперони и сыром', 500);"
    );
    tx.executeSql(
      "INSERT INTO pizzaList ( pizzaImage, pizzaName, pizzaDescription, pizzaCost) VALUES ('https://static.1000.menu/img/content-v2/ef/27/10853/picca-margarita-v-domashnix-usloviyax_1608783820_4_max.jpg', 'Маргарита', 'Классическая и простая пицца с томатами и сыром', 400);"
    );
    tx.executeSql(
      "INSERT INTO pizzaList ( pizzaImage, pizzaName, pizzaDescription, pizzaCost) VALUES ('https://kulinarnia.ru/wp-content/uploads/2016/01/pitstsa-gavayskaya-s-ananasami-recept.jpg', 'Гавайская', 'Пицца с ананасами, ветчиной и сыром', 550);"
    );
    tx.executeSql(
      "INSERT INTO pizzaList ( pizzaImage, pizzaName, pizzaDescription, pizzaCost) VALUES ('https://роллытут.рф/wp-content/uploads/2017/01/pizza-09.jpg', 'Пепперони с грибами', 'Пицца с пепперони, грибами и сыром', 600);"
    );
    tx.executeSql(
      "INSERT INTO pizzaList ( pizzaImage, pizzaName, pizzaDescription, pizzaCost) VALUES ('https://baking-academy.ru/upload/iblock/1ba/1bac340c99632765ce557aec8a1d39b3.jpg', 'Вегетарианская', 'Пицца с овощами и сыром', 450);"
    );
  });
};

export default TableFilling;
