import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import screensStyles from "./ScreensStyles";

const profileStyles = StyleSheet.create({
  card: {
    padding: 48,
    marginHorizontal: 48,
    marginTop: 48,
  },
  cardKeyboardOpen: {
    padding: 16,
    marginHorizontal: 48,
    marginTop: 0,
  },
  cardRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0000BB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  greetings: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
});

const Profile = (props) => {
  const [username, setUsername] = useState(props.username);
  const [editing, setEditing] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardOpen(true)
    );
    Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardOpen(false)
    );
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Erreur",
            "La permission d'accéder à vos photos est obligatoire pour changer votre avatar !"
          );
        }
      }
    })();
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const validate = () => {
    if (username.length === 0) {
      Alert.alert(
        "Erreur",
        "Votre nom d'utilisateur ne peut pas être vide !"
      );
    } else {
      props.setUsername(username);
      setEditing(false);
    }
  };

  const selectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={screensStyles.container}>
      <Card
        style={
          isKeyboardOpen
            ? profileStyles.cardKeyboardOpen
            : profileStyles.card
        }
      >
        <View style={profileStyles.cardRoot}>
          {editing ? (
            <TouchableOpacity
              style={profileStyles.avatarView}
              onPress={selectPicture}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={[
                    profileStyles.avatarImage,
                    { opacity: 0.6 },
                  ]}
                />
              ) : undefined}
              <Ionicons
                name="cloud-upload"
                color="#FFFFFF"
                size={32}
                style={{ position: "absolute" }}
              />
            </TouchableOpacity>
          ) : (
            <View style={profileStyles.avatarView}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={profileStyles.avatarImage}
                />
              ) : (
                <Ionicons name="person" color="#FFFFFF" size={32} />
              )}
            </View>
          )}
          <View
            style={[screensStyles.center, { alignItems: "stretch" }]}
          >
            {editing ? (
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={[
                  screensStyles.input,
                  { marginVertical: 16, width: 160 },
                ]}
              />
            ) : (
              <Text
                style={[
                  profileStyles.greetings,
                  { marginVertical: 26 },
                ]}
              >
                Bonjour {props.username} !
              </Text>
            )}
          </View>
          <Button
            title={editing ? "Valider" : "Editer mon profil"}
            style={[screensStyles.margin, { width: 160 }]}
            onPress={editing ? validate : () => setEditing(true)}
          />
          <Button
            title="Me déconnecter"
            style={{ width: 160 }}
            onPress={props.logout}
          />
        </View>
      </Card>
    </View>
  );
};

export default Profile;
