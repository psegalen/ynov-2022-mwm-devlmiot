import { Ionicons } from "@expo/vector-icons";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import React, { useContext, useEffect } from "react";
import {
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../data/UserContext";
import profileStyles from "../styles/ProfileStyles";

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

const UploadButton = () => {
  const { user, modifyUser } = useContext(UserContext);
  useEffect(() => {
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
  }, []);

  const selectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!result.cancelled) {
      modifyUser({ avatar: result.uri }, false);
      const avatar = await uploadImageAsync(
        result.uri,
        user.id,
        result.type === "image/png" ? "png" : "jpg"
      );
      modifyUser({ avatar });
    }
  };
  return (
    <TouchableOpacity
      style={profileStyles.avatarView}
      onPress={selectPicture}
    >
      {user.avatar ? (
        <Image
          source={{ uri: user.avatar }}
          style={[profileStyles.avatarImage, { opacity: 0.6 }]}
        />
      ) : undefined}
      <Ionicons
        name="cloud-upload"
        color="#FFFFFF"
        size={32}
        style={{ position: "absolute" }}
      />
    </TouchableOpacity>
  );
};

export default UploadButton;
