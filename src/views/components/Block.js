import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../conts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Функция добавления в асинк сторедж нового заказа
// setToBusket = async (pizza) => {
//   try {
//     const order = await AsyncStorage.getItem("@order");
//     const parsedOrder = order ? JSON.parse(order) : [];

//     const existingOrder = parsedOrder.find(
//       (item) => item.pizza.pizzaID === pizza.pizzaID
//     ) || {
//       count: 0,
//     };

//     const newOrder = parsedOrder
//       .filter((item) => item.pizza.pizzaID !== pizza.pizzaID)
//       .concat({ pizza, count: existingOrder.count + 1 });

//     console.log(`Заказ: ${JSON.stringify(newOrder)}`);

//     await AsyncStorage.setItem("@order", JSON.stringify(newOrder));
//   } catch (error) {
//     console.log(error);
//   }
// };

// setToBusket = async (value) => {
//   try {
//     const order = await AsyncStorage.getItem("@order");
//     const parsedOrder = order ? JSON.parse(order) : [];

//     const existingOrder = parsedOrder.find(
//       (item) => item.pizzaID === value
//     ) || {
//       count: 0,
//     };

//     const newOrder = parsedOrder
//       .filter((item) => item.pizzaID !== value)
//       .concat({ pizzaID: value, count: existingOrder.count + 1 });

//     console.log(`Заказ: ${JSON.stringify(newOrder)}`);

//     await AsyncStorage.setItem("@order", JSON.stringify(newOrder));
//   } catch (error) {
//     console.log(error);
//   }
// };

const Block = ({ idPizza, imgSrc, pizzaName, description, cost }) => {
  const setToBusket = async (value) => {
    try {
      const order = await AsyncStorage.getItem("@order");
      const parsedOrder = order ? JSON.parse(order) : [];
  
      const existingOrder = parsedOrder.find(
        (item) => item.pizzaID === value
      ) || {
        count: 0,
      };
  
      const newOrder = parsedOrder
        .filter((item) => item.pizzaID !== value)
        .concat({ pizzaID: value, count: existingOrder.count + 1 });
  
      console.log(`Заказ: ${JSON.stringify(newOrder)}`);
  
      await AsyncStorage.setItem("@order", JSON.stringify(newOrder));
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.menuContainer}>
      <Image style={styles.pizza} source={{ uri: imgSrc }}></Image>
      <View style={styles.shortDescription}>
        <View style={styles.Name}>
          <Text style={{ fontSize: 20 }}>{pizzaName}</Text>
        </View>
        <View style={styles.Description}>
          <Text>{description}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buyButton}
          onPress={() => setToBusket(idPizza)}
        >
          <Text style={{ fontSize: 18 }}>{cost} ₽</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "3%",
    paddingVertical: "3%",
    paddingRight: "30%",
    width: "90%",
    height: 200,
    borderRadius: 20,
  },
  shortDescription: {
    height: "100%",
    flexDirection: "column",
    alignContent: "space-around",
  },
  pizza: {
    marginLeft: 100,
    borderRadius: 150,
    borderWidth: 5,
    height: 175,
    width: 175,
    resizeMode: "contain",
  },
  Name: { flex: 1 },
  Description: { flex: 5 },
  buyButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.thirty,
    height: 60,
    width: 80,
  },
});

export default Block;
