import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import Button from "../components/Button";

import screensStyles from "./ScreensStyles";

const styles = StyleSheet.create({
  todoCompletedCard: {
    opacity: 0.4,
  },
  todoTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  todoCompletedTitle: {
    textDecorationLine: "line-through",
  },
});

const TodosList = (props) => (
  <View style={screensStyles.container}>
    <View style={screensStyles.header}>
      <Text style={screensStyles.title}>A faire</Text>
      <Button onPress={props.onAdd} title="Ajouter" />
    </View>
    <ScrollView>
      {props.loading ? (
        <ActivityIndicator color="blue" />
      ) : (
        props.todos.map((todoItem) => (
          <Card
            key={`${todoItem.id}`}
            style={[
              screensStyles.padding,
              screensStyles.margin,
              todoItem.completed
                ? styles.todoCompletedCard
                : undefined,
            ]}
          >
            <Text
              style={[
                styles.todoTitle,
                todoItem.completed
                  ? styles.todoCompletedTitle
                  : undefined,
              ]}
            >
              {todoItem.title}
            </Text>
          </Card>
        ))
      )}
    </ScrollView>
  </View>
);

export default TodosList;
