import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../../conts/colors";

const Button = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: COLORS.ten,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
