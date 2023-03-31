import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../conts/colors";

const Block = ({ imgSrc, pizzaName, description, cost }) => {
  return (
    <View style={styles.menuContainer}>
      <Image style={styles.pizza} source={{ uri: imgSrc }}></Image>
      <View style={styles.shortDescription}>
        <View style={styles.Name}>
          <Text>{pizzaName}</Text>
        </View>
        <View style={styles.Description}>
          <Text>{description}</Text>
        </View>
        <View style={styles.buyButton}>
          <Text>{cost} ₽</Text>
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
    paddingRight: "5%",
    width: "85%",
    height: 200,
    // backgroundColor: COLORS.light,
    borderRadius: 20,
  },
  shortDescription: {
    height: "100%",
    flexDirection: "column",
    alignContent: "space-around",
  },
  pizza: {
    borderRadius: 150,
    borderWidth: 5,
    height: 175,
    width: 175,
    resizeMode: "contain",
  },
  Name: { flex: 1 },
  Description: { flex: 5 },
  buyButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: COLORS.thirty,
    height: 30,
    width: 80,
    flex: 1,
  },
});

export default Block;
