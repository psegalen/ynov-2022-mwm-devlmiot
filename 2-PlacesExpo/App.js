import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AddPlace from "./src/screens/AddPlace";
import PlacesList from "./src/screens/PlacesList";
import Button from "./src/components/Button";
import Profile from "./src/screens/Profile";

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

const PlacesStack = createNativeStackNavigator();
const RootTab = createBottomTabNavigator();

export default function App() {
  const [places, setPlaces] = useState(initialPlaces);

  const addPlace = (place) => {
    const newPlaces = [...places, place];
    setPlaces(newPlaces);
  };

  return (
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
        <RootTab.Screen
          component={Profile}
          name="Profile"
          options={{ title: "Profil" }}
        />
      </RootTab.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
