import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const name = await AsyncStorage.getItem("name-key");
        const lastName = await AsyncStorage.getItem("lastName-key");
        const email = await AsyncStorage.getItem("email-key");
        if (name) {
          setName(name);
        }
        if (lastName) {
          setLastName(lastName);
        }
        if (email) {
          setEmail(email);
        }
        console.log(name, email);
      } catch (e) {
        // error reading value
      }
    })();
  }, []);

  const storeData = async (name, lastName, email) => {
    try {
      await AsyncStorage.setItem(`name-key`, name);
      await AsyncStorage.setItem(`lastName-key`, lastName);
      await AsyncStorage.setItem(`email-key`, email);
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = async () => {
    try {
      const name = await AsyncStorage.getItem("name-key");
      const lastName = await AsyncStorage.getItem("lastName-key");
      const email = await AsyncStorage.getItem("email-key");
      if (name) setName(name);
      if (lastName) setLastName(lastName);
      if (email) setEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("name-key");
      await AsyncStorage.removeItem("lastName-key");
      await AsyncStorage.removeItem("email-key");
      console.log("logged out");
      navigation.navigate("OnBoarding");
    } catch (e) {
      console.log(e);
    } finally {
      setName("");
      setLastName("");
      setEmail("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        {name?.length > 0 && (
          <View style={styles.avatar}>
            <Text style={styles.avatartext}>
              {name[0]}
              {lastName[0]}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.center}>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          textContentType="emailAddress"
        />
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => storeData(name, lastName, email)}
          >
            <Text style={styles.avatartext}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={cancel}>
            <Text style={styles.avatartext}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.avatartext}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    marginTop: 30,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#ffcc00",
  },
  avatartext: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  backButton: {
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
    borderRadius: 20 / 2,
  },
  back: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
  },
  button: {
    marginTop: 100,
    marginHorizontal: 10,
    width: 200,
    height: 60,
    backgroundColor: "#ffcc00",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    marginTop: 50,
    marginHorizontal: 30,
    width: 100,
    height: 50,
    backgroundColor: "#ffcc00",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: 370,
    height: 800,
    borderRadius: 80,
  },
});
