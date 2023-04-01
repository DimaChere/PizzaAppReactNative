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

const BlockBasket = ({ imgSrc, pizzaName, description, cost }) => {
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
        <View style={styles.buyButton}>
          <Text style={{ fontSize: 18 }} onPress={() => setToBusket(pizzaName)}>
            {cost} ₽
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

export default BlockBasket;
