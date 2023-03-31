import React from "react";
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

const MenuScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Icon
          name="food-drumstick-outline"
          style={styles.search}
          onPress={() => navigation.navigate("SearchScreen")}
        ></Icon>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.mainScreen}>
            <Text>Меню</Text>
            {/* {pizzaList.map((obj) => (
              <Block
                imgSrc={obj.imgSrc}
                pizzaName={obj.pizzaName}
                description={obj.description}
                cost={obj.cost}
              />
            ))} */}
            <StatusBar style="auto" />
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
  searchContainer: {
    zIndex: 2,
    backgroundColor: COLORS.thirty,
    height: 80,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingTop: 30,
    paddingRight: 10,
  },
  search: {
    fontSize: 40,
    color: COLORS.ten,
  },
});

export default MenuScreen;
