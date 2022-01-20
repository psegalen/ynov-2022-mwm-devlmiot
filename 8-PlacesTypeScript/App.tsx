import React from "react";
import { StatusBar } from "expo-status-bar";
import Root from "./src/Root";
import { PlacesProvider } from "./src/data/PlacesContext";
import { UserProvider } from "./src/data/UserContext";

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
