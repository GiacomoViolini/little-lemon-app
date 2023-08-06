import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [menu, setMenu] = useState([]);

  const navigation = useNavigation();

  const Item = ({ name, price, description, image, category }) => (
    <>
      <View style={styles.text_container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
        }}
        defaultSource={require("../assets/Heroimage.png")}
        style={styles.flex_image}
      />
    </>
  );

  const fetchData = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const data = await response.json();
    const menu = data.menu.map((item) => ({
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    }));
    return menu;
  };

  useEffect(() => {
    (async () => {
      try {
        const name = await AsyncStorage.getItem("name-key");
        const lastName = await AsyncStorage.getItem("lastName-key");
        if(name)
        setName(name);
        if (lastName){
          setLastName(lastName);
        }
        const menu = await fetchData();
        setMenu(menu);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profile}
        >
          <Text style={styles.button_text}>
            {name[0]}
            {lastName[0]}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hero_container}>
        <Text style={styles.hero_title}>Little Lemon</Text>
        <View style={styles.hero_layout}>
          <View style={styles.hero_textContainer}>
            <Text style={styles.hero_description}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twisted
            </Text>
          </View>
          <Image
            source={require("../assets/Heroimage.png")}
            style={styles.hero}
          />
        </View>
      </View>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.menu}>
            <Item
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              category={item.category}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffcc00",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button_text: {
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
  },
  topbar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  hero: {
    width: 170,
    height: 170,
    borderRadius: 20,
    resizeMode: "cover",
  },
  hero_container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    width: "100%",
    marginTop: 15,
  },
  hero_layout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hero_title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  hero_textContainer: {
    flex: 1,
    marginRight: 15,
  },
  hero_description: {
    fontSize: 19,
    color: "#666",
  },
  menu: {
    padding: 15,
    margin: 15,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    width: 300,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "999999",
  },
  flex_image: {
    width: 140,
    height: 140,
    borderRadius: 20,
    resizeMode: "cover",
    marginRight: 10,
    borderWidth: 0.2,
    borderColor: "black",
  },
  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 15,
    color: "#666",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text_container: {
    flex: 1,
    marginRight: 10,
  },
});
