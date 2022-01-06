import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";

import AddPlace from "./screens/AddPlace";
import PlacesList from "./screens/PlacesList";
import Button from "./components/Button";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import screensStyles from "./screens/ScreensStyles";
import { UserContext } from "./data/UserContext";

const PlacesStack = createNativeStackNavigator();
const RootTab = createBottomTabNavigator();

export default function Root() {
  const [loading, setLoading] = useState(true);
  const { checkUser, userid } = useContext(UserContext);

  useEffect(() => {
    const launch = async () => {
      await checkUser();
      setLoading(false);
    };
    launch();
  }, []);

  if (loading)
    return (
      <View style={[screensStyles.container, screensStyles.center]}>
        <ActivityIndicator color="#0000BB" />
      </View>
    );

  return userid.length > 0 ? (
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
  ) : (
    <Login />
  );
}
