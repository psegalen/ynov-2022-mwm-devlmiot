import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddPlace from "./src/screens/AddPlace";
import PlacesList from "./src/screens/PlacesList";
import Button from "./src/components/Button";

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

export default function App() {
  const [places, setPlaces] = useState(initialPlaces);

  const addPlace = (place) => {
    const newPlaces = [...places, place];
    setPlaces(newPlaces);
  };

  return (
    <NavigationContainer>
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
          {(props) => <AddPlace {...props} addPlace={addPlace} />}
        </PlacesStack.Screen>
      </PlacesStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
