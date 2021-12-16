import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";

import screensStyles from "./ScreensStyles";

const listStyles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
  },
  cardText: {
    textAlign: "center",
  },
});

const PlacesList = (props) => {
  return (
    <ScrollView
      style={screensStyles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      {props.places.map((p) => (
        <Card style={listStyles.card} key={p.id}>
          <Text style={listStyles.cardText}>{p.place.name}</Text>
          <Text style={listStyles.cardText}>
            {p.rate} / {p.comment}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
};

export default PlacesList;
