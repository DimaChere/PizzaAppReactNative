import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import COLORS from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Icon
          name="keyboard-backspace"
          style={styles.backToMenu}
          onPress={() => navigation.navigate("HomeScreen")}
        ></Icon>
        <Icon name="food-drumstick-outline" style={styles.search}></Icon>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            <StatusBar style="auto" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.sixty,
    flex: 1,
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
  searchContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 30,
    paddingRight: 10,
  },
  search: {
    fontSize: 40,
    color: COLORS.ten,
  },
  backToMenu: {
    fontSize: 40,
    color: COLORS.ten,
  },
});
