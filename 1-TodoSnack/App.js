import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import TodosList from "./screens/TodosList";
import AddTodo from "./screens/AddTodo";

export default function App() {
  return <AddTodo />;
}
