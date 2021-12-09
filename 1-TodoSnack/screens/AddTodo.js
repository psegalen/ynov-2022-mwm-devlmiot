import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import screensStyles from "./ScreensStyles";

const addTodoStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
});

const AddTodo = () => {
  return (
    <View style={screensStyles.container}>
      <Text style={screensStyles.title}>Nouvelle Todo</Text>
      <TextInput
        style={[addTodoStyles.input, screensStyles.margin]}
      />
      <Button title="Ajouter cette Todo" />
    </View>
  );
};

export default AddTodo;
