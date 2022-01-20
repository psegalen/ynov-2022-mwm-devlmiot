import React, { FC } from "react";
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: "#0000BB",
    borderRadius: 8,
    padding: 8,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = (props) => (
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor="#000088"
    style={[buttonStyles.container, props.style]}
  >
    <Text style={buttonStyles.title}>{props.title}</Text>
  </TouchableHighlight>
);

export default Button;
