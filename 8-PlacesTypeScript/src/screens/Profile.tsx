import { Ionicons } from "@expo/vector-icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { Text, View, TextInput, Keyboard, Alert, Image } from "react-native";
import { Card } from "react-native-paper";
import Button from "../components/Button";
import screensStyles from "./ScreensStyles";
import { UserContext } from "../data/UserContext";
import profileStyles from "../styles/ProfileStyles";
import UploadButton from "../components/UploadButton";

const Profile: FC = () => {
  const { user, logout, modifyUser } = useContext(UserContext);
  const [username, setUsername] = useState(user?.name as string);
  const [editing, setEditing] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setIsKeyboardOpen(true));
    Keyboard.addListener("keyboardDidHide", () => setIsKeyboardOpen(false));
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const validate = () => {
    if (username.length === 0) {
      Alert.alert("Erreur", "Votre nom d'utilisateur ne peut pas être vide !");
    } else {
      modifyUser({ name: username });
      setEditing(false);
    }
  };

  return (
    <View style={screensStyles.container}>
      <Card
        style={
          isKeyboardOpen ? profileStyles.cardKeyboardOpen : profileStyles.card
        }
      >
        <View style={profileStyles.cardRoot}>
          {editing ? (
            <UploadButton />
          ) : (
            <View style={profileStyles.avatarView}>
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={profileStyles.avatarImage}
                />
              ) : (
                <Ionicons name="person" color="#FFFFFF" size={32} />
              )}
            </View>
          )}
          <View style={[screensStyles.center, { alignItems: "stretch" }]}>
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
              <Text style={[profileStyles.greetings, { marginVertical: 26 }]}>
                Bonjour {user?.name} !
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
