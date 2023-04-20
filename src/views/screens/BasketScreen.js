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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import GetPizzaFromOrder from "../components/GetPizzaFromOrder";

// основня функция
const BasketScreen = () => {
  // очистка корзины
  

  // массив названий пицц
  let [orderList, setOrderList] = useState([{}]);

  const ClearAll = async () => {
    try {
      console.log("корзина очищена");
      setOrderList([]);
      await AsyncStorage.removeItem("@order");
    } catch (e) {}
  };

  const getOrder = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@order"); // получаем JSON-строку из AsyncStorage
      if (jsonValue !== null) {
        const orderArray = JSON.parse(jsonValue); // преобразуем строку в массив
        setOrderList(orderArray);
      }
    } catch (e) {
      console.log(`Error ${e}`);
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderList]);

  return (
    <SafeAreaView>
      <View style={styles.upperContainer}>
        <Text style={styles.contents}>Корзина</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            {orderList.map((pizza) => {
              return (
                <GetPizzaFromOrder
                  key={pizza.pizzaID}
                  pizzaID={pizza.pizzaID}
                  count={pizza.count}
                />
              );
            })}
            <StatusBar style="auto" />
            <Button title="Обновить корзину" onPress={getOrder} />
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
