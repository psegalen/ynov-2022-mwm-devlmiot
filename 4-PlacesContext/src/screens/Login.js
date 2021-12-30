import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <TextInput
          placeholder="Login"
          style={inputStyle}
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Mot de passe"
          style={inputStyle}
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          secureTextEntry
        />
        <Button
          title="Se connecter"
          onPress={() => {
            props.login(email, password);
          }}
        />
      </Card>
    </View>
  );
};

export default Login;
