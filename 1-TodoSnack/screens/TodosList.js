import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
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
  todoRoot: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
  },
  todoCard: {
    flex: 1,
    marginRight: 8,
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
          <View style={styles.todoRoot} key={`${todoItem.id}`}>
            <TouchableOpacity
              onPress={() => props.toggleTodo(todoItem.id)}
              style={styles.todoCard}
            >
              <Card
                style={[
                  screensStyles.padding,
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
            </TouchableOpacity>
            <Button
              title="Supprimer"
              onPress={() => props.removeTodo(todoItem.id)}
            />
          </View>
        ))
      )}
    </ScrollView>
  </View>
);

export default TodosList;
