import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import Button from "./components/Button";
import AddPlace from "./screens/AddPlace";
import PlacesList from "./screens/PlacesList";
import Profile from "./screens/Profile";

export type PlacesParamList = {
  PlacesList: undefined;
  AddPlace: undefined;
};

const PlacesStack = createNativeStackNavigator();
const RootTab = createBottomTabNavigator();

const Navigation = () => (
  <NavigationContainer>
    <RootTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "location-sharp"
            | "location-outline"
            | "person-circle"
            | "person-circle-outline"
            | undefined;

          if (route.name === "PlacesStack") {
            iconName = focused ? "location-sharp" : "location-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
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
              options={(
                props: NativeStackScreenProps<PlacesParamList, "PlacesList">
              ) => {
                return {
                  title: "Liste des lieux",
                  headerRight: () => (
                    <Button
                      title="Ajouter"
                      onPress={() => props.navigation.navigate("AddPlace")}
                    />
                  ),
                };
              }}
              component={PlacesList}
            />
            <PlacesStack.Screen
              name="AddPlace"
              options={{ title: "Ajouter un lieu" }}
              component={AddPlace}
            />
          </PlacesStack.Navigator>
        )}
      </RootTab.Screen>
      <RootTab.Screen
        name="Profile"
        options={{ title: "Profil" }}
        component={Profile}
      />
    </RootTab.Navigator>
  </NavigationContainer>
);

export default Navigation;
