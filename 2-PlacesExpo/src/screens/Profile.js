import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import Button from "../components/Button";
import screensStyles from "./ScreensStyles";

const profileStyles = StyleSheet.create({
  card: {
    padding: 48,
    marginHorizontal: 48,
    marginTop: 48,
  },
  cardRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0000BB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  greetings: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
});

const Profile = (props) => (
  <View style={screensStyles.container}>
    <Card style={profileStyles.card}>
      <View style={profileStyles.cardRoot}>
        <View style={profileStyles.avatarView}>
          <Ionicons name="person" color="#FFFFFF" size={32} />
        </View>
        <View>
          <Text style={profileStyles.greetings}>
            Bonjour {props.username} !
          </Text>
        </View>
        <Button
          title="Changer mon nom"
          style={screensStyles.margin}
        />
        <Button
          title="Me déconnecter"
          onPress={() => props.logout()}
        />
      </View>
    </Card>
  </View>
);

export default Profile;
