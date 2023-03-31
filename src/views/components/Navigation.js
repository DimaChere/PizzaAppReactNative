import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MenuScreen from "../screens/MenuScreen";
import UserScreen from "../screens/UserScreen";
import BasketScreen from "../screens/BasketScreen";
import COLORS from "../../conts/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Menu"
      activeColor={COLORS.ten}
      inactiveColor={COLORS.sixty}
      barStyle={{ backgroundColor: COLORS.thirty }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: "Меню",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pizza" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="face-man" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          tabBarLabel: "Корзина",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
