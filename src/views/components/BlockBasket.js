import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../conts/colors";
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

const BlockBasket = ({ imgSrc, pizzaName, cost }) => {
  return (
    <View style={styles.menuContainer}>
      <Image style={styles.pizza} source={{ uri: imgSrc }}></Image>
      <View style={styles.shortDescription}>
        <View style={styles.name}>
          <Text style={{ fontSize: 20 }}>{pizzaName}</Text>
        </View>
        <View style={styles.cost}>
          <Text style={{ fontSize: 18 }}>{cost} ₽</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: "3%",
    paddingVertical: "3%",
    paddingRight: "3%",
    width: "100%",
    height: 100,
    borderRadius: 20,
  },
  shortDescription: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  pizza: {
    borderRadius: 25,
    borderWidth: 5,
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  name: { justifyContent: "center", marginLeft: 10 },
  cost: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 60,
  },
});

export default BlockBasket;
