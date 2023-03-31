import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  useState,
  Keyboard,
  Alert,
} from "react-native";
import COLORS from "../../conts/colors";
//Elements
import Button from "../components/Button";
//Screens
import * as SQLite from "expo-sqlite";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = SQLite.openDatabase("db.db");
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, phone INTEGER,  password TEXT);",
    [],
    (_, result) => {
      console.log("Таблица успешно создана");
    },
    (_, error) => {
      console.log("Ошибка создания таблицы:", error);
    }
  );
});

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  //===================================
  //   Проверка пустого поля

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.name) {
      handleError("Пожалуйста, введите свой логин", "name");
      valid = false;
    }
    if (!inputs.password) {
      valid = false;
      handleError("Пожалуйста, введите пароль", "password");
    }

    if (valid) {
      login();
    }
  };
  //   Проверка пустого поля
  //===================================

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_User", value);
    } catch (e) {
      // saving error
    }
  };

  const login = () => {
    setLoading(false);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE name=? AND password=?;",
        [inputs.name, inputs.password],
        (_, { rows }) => {
          if (rows.length > 0) {
            console.log(rows._array[0]);
            console.log("User authenticated successfully");
            storeData(rows._array[0].id);
            navigation.navigate("AfterRegisterNavigation");
          } else {
            console.log("Authentication failed");
            Alert.alert("Ошибка", "Некоректное заполнение");
          }
        },
        (_, error) => {
          console.log("Error authenticating user:", error);
          Alert.alert("Ошибка", "Некоректное заполнение");
        }
      );
    });
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            color: COLORS.darkGreyColor,
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Вход
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          Заполните свои данные для входа
        </Text>
        <View style={{ marginVertical: 20 }}>
          {/* Ввод email */}
          <Input
            placeholder="Введите имя пользователя"
            iconName="account-outline"
            label="Имя"
            error={errors.name}
            onFocus={() => {
              handleError(null, "name");
            }}
            onChangeText={(text) => handleOnChange(text, "name")}
          />
          {/* Ввод пароля */}
          <Input
            placeholder="Введите пароль"
            iconName="lock-outline"
            label="Пароль"
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
            password
          />
        </View>
        <Button title="Войти" onPress={validate} />
        <Text
          onPress={() => navigation.navigate("RegistrationScreen")}
          style={{ color: COLORS.black, textAlign: "center", fontSize: 16 }}
        >
          Не зарегистрированны? Зарегистрироваться
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.sixty,
  },
});
