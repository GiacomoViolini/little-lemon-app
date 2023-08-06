import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoarding() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const storeData = async (value1, value2) => {
    try {
      await AsyncStorage.setItem(`name-key`, value1);
      await AsyncStorage.setItem(`email-key`, value2);
    } catch (e) {
      console.log(e);
    }
    finally
    {
      setName("");
      setEmail("");
    }
  };

  let disabled = true;
  if (name.length > 0 && email.length > 0) {
    disabled = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>Let us get to know you</Text>
      <View style={styles.container2}>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Enter your first name"
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        textContentType="emailAddress"
        placeholder="Enter your email"
      />
      <Pressable
        style={disabled ? styles.buttonDisabled : styles.button}
        disabled={disabled}
        onPress={() => {
          storeData(name, email);
         navigation.navigate("HomeScreen");
        }}
      >
        <Text style={styles.text2}>Next</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    padding:20,
  },
  container2: {
    backgroundColor: "#ffffff",
    height: 800,
    alignItems: "center",
    width: 400,
    padding: 40,
    borderRadius: 100,
  },
  text1: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 80,
  },
  text: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
  },
  button: {
    marginTop: 100,
    width: 180,
    height: 50,
    backgroundColor: "#ffcc00",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    marginTop: 100,
    width: 180,
    height: 50,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
