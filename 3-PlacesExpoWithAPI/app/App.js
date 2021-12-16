import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddPlace from "./src/screens/AddPlace";
import PlacesList from "./src/screens/PlacesList";
import Button from "./src/components/Button";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";
import screensStyles from "./src/screens/ScreensStyles";
import { signUserIn, signUserOut } from "./src/firebase";
import { createPlace, getPlaces, getUser } from "./src/api";

const UserIdKey = "USERID_KEY";

const PlacesStack = createNativeStackNavigator();
const RootTab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userid, setUserid] = useState("");
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);

  const handleUserId = async (userId) => {
    if (userId) {
      setUserid(userId);
      const apiUser = await getUser(userId);
      setUser(apiUser);
      const apiPlaces = await getPlaces(userId);
      setPlaces(apiPlaces);
    }
  };

  useEffect(() => {
    const launch = async () => {
      const localId = await AsyncStorage.getItem(UserIdKey);
      handleUserId(localId);
      setLoading(false);
    };
    launch();
  }, []);

  const login = async (email, password) => {
    const userCred = await signUserIn(email, password);
    if (userCred && userCred.user) {
      handleUserId(userCred.user.email);
      AsyncStorage.setItem(UserIdKey, userCred.user.email);
    }
  };

  const logout = () => {
    signUserOut();
    setUserid("");
    AsyncStorage.removeItem(UserIdKey);
  };

  const addPlace = async (data) => {
    const finalPlace = {
      id: `${userid}|${data.place.place_id}`,
      userId: userid,
      rate: data.rate,
      comment: data.comment,
      place: {
        id: data.place.place_id,
        name: data.place.name,
        location: {
          _latitude: data.place.geometry.location.lat,
          _longitude: data.place.geometry.location.lng,
        },
      },
    };
    createPlace(finalPlace);
    const newPlaces = [...places, finalPlace];
    setPlaces(newPlaces);
  };

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
            <Profile
              {...props}
              logout={logout}
              user={user}
              setUser={setUser}
            />
          )}
        </RootTab.Screen>
      </RootTab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  ) : (
    <>
      <Login login={login} />
      <StatusBar style="auto" />
    </>
  );
}
