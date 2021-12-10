import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddPlace from "./src/screens/AddPlace";
import PlacesList from "./src/screens/PlacesList";
import Button from "./src/components/Button";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";
import { View } from "react-native";
import screensStyles from "./src/screens/ScreensStyles";
import { ActivityIndicator } from "react-native-paper";

const initialPlaces = [
  {
    id: "oigshiorg",
    place: {
      name: "Grand-Théatre",
    },
    rate: 5,
    comment: "Très joli opéra !",
  },
  {
    id: "ukezgoir",
    place: {
      name: "Ynov Bordeaux",
    },
    rate: 5,
    comment: "Ecole d'info sur les quais",
  },
  {
    id: "uhegoihhz",
    place: {
      name: "Fufu cours Portal",
    },
    rate: 5,
    comment: "Le Donburi Tonkatsu est au top !",
  },
];

const UserNameKey = "USERNAME_KEY";

const PlacesStack = createNativeStackNavigator();
const RootTab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [places, setPlaces] = useState(initialPlaces);

  useEffect(() => {
    const launch = async () => {
      const localName = await AsyncStorage.getItem(UserNameKey);
      if (localName) {
        setUsername(localName);
      }
      setLoading(false);
    };
    launch();
  }, []);

  const modifyUsername = (name) => {
    setUsername(name);
    AsyncStorage.setItem(UserNameKey, name);
  };

  const logout = () => {
    setUsername("");
    AsyncStorage.removeItem(UserNameKey);
  };

  const addPlace = (place) => {
    const newPlaces = [...places, place];
    setPlaces(newPlaces);
  };

  if (loading)
    return (
      <View style={[screensStyles.container, screensStyles.center]}>
        <ActivityIndicator color="#0000BB" />
      </View>
    );

  return username.length > 0 ? (
    <NavigationContainer>
      <RootTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "PlacesStack") {
              iconName = focused
                ? "location-sharp"
                : "location-outline";
            } else if (route.name === "Profile") {
              iconName = focused
                ? "person-circle"
                : "person-circle-outline";
            }

            // You can return any component that you like here!
            return (
              <Ionicons name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#0000BB",
          tabBarInactiveTintColor: "#000000",
        })}
      >
        <RootTab.Screen
          name="PlacesStack"
          options={{
            headerShown: false,
            title: "Lieux",
            tabBarHideOnKeyboard: true,
          }}
        >
          {() => (
            <PlacesStack.Navigator>
              <PlacesStack.Screen
                name="PlacesList"
                options={(props) => {
                  return {
                    title: "Liste des lieux",
                    headerRight: () => (
                      <Button
                        title="Ajouter"
                        onPress={() =>
                          props.navigation.navigate("AddPlace")
                        }
                      />
                    ),
                  };
                }}
              >
                {(props) => <PlacesList {...props} places={places} />}
              </PlacesStack.Screen>
              <PlacesStack.Screen
                name="AddPlace"
                options={{ title: "Ajouter un lieu" }}
              >
                {(props) => (
                  <AddPlace {...props} addPlace={addPlace} />
                )}
              </PlacesStack.Screen>
            </PlacesStack.Navigator>
          )}
        </RootTab.Screen>
        <RootTab.Screen name="Profile" options={{ title: "Profil" }}>
          {(props) => (
            <Profile {...props} logout={logout} username={username} />
          )}
        </RootTab.Screen>
      </RootTab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  ) : (
    <>
      <Login login={(name) => modifyUsername(name)} />
      <StatusBar style="auto" />
    </>
  );
}
