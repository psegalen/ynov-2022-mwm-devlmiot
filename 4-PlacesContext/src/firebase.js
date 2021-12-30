import { initializeApp, getApps } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxxxxx",
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
