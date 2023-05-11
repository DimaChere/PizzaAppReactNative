import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../../conts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

setToBusket = async (value) => {
  try {
    const order = await AsyncStorage.getItem("@order");
    const parsedOrder = order ? JSON.parse(order) : [];
    const newOrder = [...parsedOrder, value];
    console.log(newOrder);
    await AsyncStorage.setItem("@order", JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};

const BlockBasket = ({ imgSrc, pizzaName, description, cost, count }) => {
  return (
    <View style={styles.menuContainer}>
      <Image style={styles.pizza} source={{ uri: imgSrc }}></Image>
      <View style={styles.shortDescription}>
        <View style={styles.Name}>
          <Text style={{ fontSize: 15 }}>{pizzaName}</Text>
        </View>
        <View style={styles.buyButton}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            {count} шт.{"\n"} = {"\n"} {count * cost} ₽
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginVertical: 6,
    width: 400,
    height: 100,
    borderRadius: 20,
  },
  shortDescription: {
    flex: 1,
    paddingLeft: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  pizza: {
    borderRadius: 50,
    borderWidth: 5,
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  Name: { justifyContent: "center", alignItems: "center" },
  buyButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.thirty,
    height: 80,
    width: 100,
  },
});

export default BlockBasket;
