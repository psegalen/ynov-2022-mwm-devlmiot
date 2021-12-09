import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Button from "../components/Button";

import screensStyles from "./ScreensStyles";

const addTodoStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
});

const AddTodo = (props) => {
  const [title, setTitle] = useState("");

  return (
    <View
      style={[
        screensStyles.container,
        { justifyContent: "flex-start" },
      ]}
    >
      <View style={{ width: 120, marginBottom: 32, marginTop: 24 }}>
        <Button title="Retour" onPress={props.onBack} />
      </View>
      <Text style={screensStyles.title}>Nouvelle Todo</Text>
      <TextInput
        style={[addTodoStyles.input, screensStyles.margin]}
        onChangeText={(newText) => setTitle(newText)}
        value={title}
      />
      <Button
        title="Ajouter cette Todo"
        onPress={() => {
          props.addTodo(title);
          props.onBack();
        }}
      />
    </View>
  );
};

export default AddTodo;
