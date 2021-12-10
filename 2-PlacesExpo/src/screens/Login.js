import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import Constants from "expo-constants";
import Button from "../components/Button";
import screensStyles from "./ScreensStyles";

const loginStyles = StyleSheet.create({
  card: {
    padding: 32,
  },
});

const inputStyle = [screensStyles.input, screensStyles.margin];

const Login = (props) => {
  return (
    <View
      style={[
        screensStyles.container,
        { paddingTop: Constants.statusBarHeight + 8 },
      ]}
    >
      <Card style={loginStyles.card}>
        <Text style={screensStyles.title}>Bienvenue !</Text>
        <Text style={[screensStyles.title, screensStyles.margin]}>
          Merci de vous authentifier
        </Text>
        <TextInput placeholder="Login" style={inputStyle} />
        <TextInput placeholder="Mot de passe" style={inputStyle} />
        <Button
          title="Se connecter"
          onPress={() => {
            props.login("François");
          }}
        />
      </Card>
    </View>
  );
};

export default Login;
