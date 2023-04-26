import { StatusBar } from "expo-status-bar";
import React from "react";
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
import * as SQLite from "expo-sqlite";
//Elements
import Button from "../components/Button";
//Screens
import Input from "../components/RegLog/Input.js";

const db = SQLite.openDatabase("db.db");

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, phone INTEGER,  password TEXT);",
    [],
    (_, result) => {
      console.log("Таблица регистрации успешно создана");
    },
    (_, error) => {
      console.log("Ошибка создания таблицы регистрации:", error);
    }
  );
});

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError("Пожалуйста, введите свой Email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Пожалуйста, введите коректный Email", "email");
      valid = false;
    }

    if (!inputs.name) {
      handleError("Пожалуйста, введите имя пользователя", "name");
      valid = false;
    }

    if (!inputs.phone) {
      handleError("Пожалуйста, введите номер телефона", "phone");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Пожалуйста, введите пароль", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("Минимальное количество символов в пароле: 5", "password");
      valid = false;
    }

    if (valid) {
      register();
    }
  };

  const register = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users ( email, name, phone, password) VALUES (?, ?, ?, ?);",
        [inputs.email, inputs.name, inputs.phone, inputs.password],
        (_, result) => {
          console.log("New user added successfully");
          navigation.navigate("LoginScreen");
        },
        (_, error) => {
          console.log("Error adding user:", error);
          Alert.alert("Ошибка", "Что-то пошло не так(");
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
            color: COLORS.black,
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Регистрация
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          Заполните свои данные для регистрации
        </Text>
        <View style={{ marginVertical: 20 }}>
          {/* Ввод email */}
          <Input
            placeholder="Введите Email-адрес"
            iconName="email-outline"
            label="Email"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          {/* Ввод Имени */}
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
          {/* Ввод Телефона */}
          <Input
            keyboardType="numeric"
            placeholder="Введите Телефон"
            iconName="phone-outline"
            label="Телефон"
            error={errors.phone}
            onFocus={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => handleOnChange(text, "phone")}
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
        <Button title="Зарегистрироваться" onPress={validate} />
        <Text
          onPress={() => navigation.navigate("LoginScreen")}
          style={{ color: COLORS.black, textAlign: "center", fontSize: 16 }}
        >
          Уже зарегестрированны? Войти
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.sixty,
  },
});
