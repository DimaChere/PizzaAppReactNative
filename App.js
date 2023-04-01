import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Elements
//Screens
import LoginScreen from "./src/views/screens/LoginScreen";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import MenuScreen from "./src/views/screens/MenuScreen";
import React from "react";
import AfterRegisterNavigation from "./AfterRegistrationNavigation";
import COLORS from "./src/conts/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="AfterRegisterNavigation"
          component={AfterRegisterNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.sixty,
    alignItems: "center",
    justifyContent: "center",
  },
});
