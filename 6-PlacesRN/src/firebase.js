import {initializeApp, getApps} from 'firebase/app';
import {signInWithEmailAndPassword, signOut, getAuth} from 'firebase/auth';
import {Alert} from 'react-native';

const firebaseConfig = {
  apiKey: 'XXXXXXXXX',
  authDomain: 'xxxxxxxx',
  projectId: 'xxxxxxxx',
  storageBucket: 'xxxxxxxx',
  messagingSenderId: 'xxxxxxxx',
  appId: 'xxxxxxxx',
  measurementId: 'xxxxxxxx',
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const signUserIn = async (login, password) =>
  signInWithEmailAndPassword(getAuth(), login, password).catch(() =>
    Alert.alert(
      'Authentification échouée',
      "Vos identifiants n'ont pas été reconnus",
    ),
  );

export const signUserOut = async () => signOut(getAuth());
