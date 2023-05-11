import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../conts/colors";

const SumOrder = ({ pizza }) => {
  const Summa = () => {
    let totalSum = 0;
    pizza.forEach((element) => {
      totalSum += element.count * element.cost;
    });
    if (totalSum > 0) return <Text style={styles.totSum}>{totalSum} ₽</Text>;
  };

  return (
    <View>
      <Summa />
    </View>
  );
};
const styles = StyleSheet.create({
  totSum: {
    fontSize: 24,
    backgroundColor: COLORS.thirty,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
  },
});
export default SumOrder;
