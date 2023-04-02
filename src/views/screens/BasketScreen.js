import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import COLORS from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SQLite from "expo-sqlite";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import BlockBasket from "../components/BlockBasket";
import BasketFill from "../components/BasketFill";

const db = SQLite.openDatabase("db.db");

const BasketScreen = () => {
  const ClearAll = async () => {
    try {
      await AsyncStorage.removeItem("@order");
    } catch (e) {}
  };

  return (
    <SafeAreaView>
      <View style={styles.upperContainer}>
        <Text style={styles.contents}>Корзина</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            <StatusBar style="auto" />
            <BasketFill />
            <Button title="Очистить корзину" onPress={ClearAll} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.sixty,
  },
  scroll: {
    marginBottom: 80,
  },
  mainScreen: {
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: "black",
  },
  upperContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
  },
  contents: {
    fontSize: 40,
    color: COLORS.ten,
  },
});

export default BasketScreen;
