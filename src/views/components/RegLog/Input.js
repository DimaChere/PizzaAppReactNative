import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import COLORS from "../../../conts/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  //управление фокусом
  const [isFocused, setIsFocused] = React.useState(false);
  // прятать пароль
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View style={{ marginBottom: 6 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.thirty
              : COLORS.ten,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          style={{ fontSize: 22, color: COLORS.thirty, marginRight: 10 }}
        />

        <TextInput
          // hide password
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(true);
          }}
          style={{ color: COLORS.black, flex: 1 }}
          {...props}
        />

        {/* Иконка глаза */}
        {password && (
          <MaterialCommunityIcons
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ fontSize: 22, color: COLORS.ten }}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          />
        )}
      </View>

      {/* Ошибка */}
      {error && (
        <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.black,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.sixty,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    alignItems: "center",
  },
});

export default Input;
