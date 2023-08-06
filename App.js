import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "./components/OnBoarding";
import Profile from "./components/Profile";
import HomeScreen from "./components/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const name = await AsyncStorage.getItem("name-key");
        const email = await AsyncStorage.getItem("email-key");
        if (name && email) {
          // value previously stored
          setRegistered(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    checkRegistrationStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={!registered? "OnBoarding": "HomeScreen"}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
