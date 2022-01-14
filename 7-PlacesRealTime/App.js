import { StatusBar } from "expo-status-bar";
import React from "react";
import { PlacesProvider } from "./src/data/PlacesContext";
import { UserProvider } from "./src/data/UserContext";
import Root from "./src/Root";

export default function App() {
  return (
    <PlacesProvider>
      <UserProvider>
        <Root />
        <StatusBar style="auto" />
      </UserProvider>
    </PlacesProvider>
  );
}
