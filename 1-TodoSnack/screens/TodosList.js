import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";

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

const TodosList = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={screensStyles.container}>
      <Text style={screensStyles.title}>A faire :</Text>
      <ScrollView>
        {loading ? (
          <ActivityIndicator color="blue" />
        ) : (
          todos.map((todoItem) => (
            <Card
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
};

export default TodosList;
