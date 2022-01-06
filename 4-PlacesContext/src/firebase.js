import { initializeApp, getApps } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXX",
  authDomain: "xxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxx",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const signUserIn = async (login, password) =>
  signInWithEmailAndPassword(getAuth(), login, password).catch(() =>
    Alert.alert(
      "Authentification échouée",
      "Vos identifiants n'ont pas été reconnus"
    )
  );

export const signUserOut = async () => signOut(getAuth());
