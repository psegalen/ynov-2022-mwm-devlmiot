import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Button from "../components/Button";
import screensStyles from "./ScreensStyles";
import { updateUser } from "../api";

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

const uploadImageAsync = async (uri, userId, extension) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const storage = getStorage();
  const fileRef = ref(storage, `avatars/${userId}.${extension}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(result.ref);
};

const Profile = ({ user, setUser, logout }) => {
  const [username, setUsername] = useState(user.name);
  const [editing, setEditing] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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
      setUser({ ...user, name: username });
      setEditing(false);
      updateUser({ id: user.id, name: username });
    }
  };

  const selectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!result.cancelled) {
      setUser({ ...user, avatar: result.uri });
      const avatar = await uploadImageAsync(
        result.uri,
        user.id,
        result.type === "image/png" ? "png" : "jpg"
      );
      updateUser({ id: user.id, avatar });
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
              {user.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
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
              {user.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
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
                Bonjour {user.name} !
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
            onPress={logout}
          />
        </View>
      </Card>
    </View>
  );
};

export default Profile;
