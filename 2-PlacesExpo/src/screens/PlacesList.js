import React from "react";
import { Text, View, StyleSheet } from "react-native";
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
    <View style={screensStyles.container}>
      {props.places.map((p) => (
        <Card style={listStyles.card} key={p.id}>
          <Text style={listStyles.cardText}>{p.place.name}</Text>
          <Text style={listStyles.cardText}>
            {p.rate} / {p.comment}
          </Text>
        </Card>
      ))}
    </View>
  );
};

export default PlacesList;
