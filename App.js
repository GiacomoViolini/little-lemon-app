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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const name = await AsyncStorage.getItem("name-key");
        const email = await AsyncStorage.getItem("email-key");
        console.log(name, email);
        if (name && email) {
          setRegistered(true);
        } else {
          setRegistered(false);
        }
      } catch (e) {
        // error reading value
      } finally {
        setLoading(false);
      }
    };
    checkRegistrationStatus();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={registered ? "HomeScreen" : "OnBoarding"}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
