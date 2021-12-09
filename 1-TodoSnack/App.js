import React, { useEffect, useState } from "react";

import TodosList from "./screens/TodosList";
import AddTodo from "./screens/AddTodo";

export default function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => {
          setTodos(data.slice(0, 20));
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const addTodo = (newTitle) => {
    const idMax = todos[todos.length - 1].id;
    const newTodos = [
      ...todos,
      {
        id: idMax + 1,
        title: newTitle,
        completed: false,
      },
    ];
    setTodos(newTodos);
  };

  const toggleTodo = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const removeTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  return isAdding ? (
    <AddTodo onBack={() => setIsAdding(false)} addTodo={addTodo} />
  ) : (
    <TodosList
      onAdd={() => setIsAdding(true)}
      loading={loading}
      todos={todos}
      toggleTodo={toggleTodo}
      removeTodo={removeTodo}
    />
  );
}
