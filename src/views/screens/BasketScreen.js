import React, { useEffect, useRef, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import GetPizzaFromOrder from "../components/Basket/GetPizzaFromOrder";
import SumOrder from "../components/Basket/SumOrder";
import { TouchableOpacity } from "react-native";
// основня функция
const BasketScreen = () => {
  // очистка корзины

  // массив названий пицц
  let [orderList, setOrderList] = useState([{}]);

  const ClearAll = async () => {
    try {
      // console.log("корзина очищена");
      setOrderList([]);
      await AsyncStorage.removeItem("@order");
    } catch (e) {}
    try {
      // console.log("корзина очищена");
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
        <TouchableOpacity>
          <Text style={styles.reload} onPress={getOrder}>
            Обновить корзину
          </Text>
        </TouchableOpacity>
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
            <SumOrder pizza={orderList} />
            <StatusBar style="auto" />
          </View>
        </View>
        <Button title="Заказать" onPress={ClearAll} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.sixty,
  },
  scroll: {
    backgroundColor: COLORS.sixty,
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  contents: {
    fontSize: 40,
    color: COLORS.ten,
  },
  reload: {
    fontSize: 17,
    color: COLORS.white,
    fontWeight: 700,
    backgroundColor: COLORS.ten,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
  },
});

export default BasketScreen;
