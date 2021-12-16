import { initializeApp, getApps } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyB1xLksThm1NBVcDmoxEyT74bYudDTXWWI",
  authDomain: "ynov-todos.firebaseapp.com",
  projectId: "ynov-todos",
  storageBucket: "ynov-todos.appspot.com",
  messagingSenderId: "659421845328",
  appId: "1:659421845328:web:a0f0a38ee6536c1aad3e55",
  measurementId: "G-PNNSYB0H7X",
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
