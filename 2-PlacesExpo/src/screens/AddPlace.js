import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Picker } from "@react-native-picker/picker";

import screensStyles from "./ScreensStyles";
import Button from "../components/Button";
import { PlacesApiKey } from "../conf";

const addStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
});

const AddPlace = (props) => {
  const [place, setPlace] = useState(null);
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");

  return (
    <KeyboardAvoidingView style={screensStyles.container}>
      <GooglePlacesAutocomplete
        placeholder="Rechercher un lieu ..."
        fetchDetails={true}
        onPress={(_, details = null) => {
          // 'details' is provided when fetchDetails = true
          setPlace(details);
        }}
        onFail={(error) => console.log(error)}
        query={{
          key: PlacesApiKey,
          language: "fr",
          components: "country:fr",
        }}
        textInputProps={{
          style: addStyles.input,
        }}
        styles={{
          container: {
            flex: 0,
          },
        }}
      />
      {place ? (
        <View style={addStyles.formContainer}>
          <Text>Choisissez une note</Text>
          <Picker
            selectedValue={`${rate}`}
            style={[addStyles.input, { width: 150 }]}
            onValueChange={(itemValue) =>
              setRate(parseInt(itemValue))
            }
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
          <TextInput
            value={comment}
            onChangeText={(txt) => setComment(txt)}
            style={addStyles.input}
            placeholder="Commentaire ..."
          />
          <Button
            title="Ajouter"
            onPress={() => {
              props.addPlace({
                place,
                rate,
                comment,
              });
              props.navigation.goBack();
            }}
          />
        </View>
      ) : undefined}
    </KeyboardAvoidingView>
  );
};

export default AddPlace;
