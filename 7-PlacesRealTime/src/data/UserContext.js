import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  listenUserProfile,
  signUserIn,
  signUserOut,
} from "../firebase";
import { PlacesContext } from "./PlacesContext";
import { getUser, updateUser } from "./api";

const UserIdKey = "USERID_KEY";

export const UserContext = createContext({
  user: null,
  userid: "",
  checkUser: async () => {},
  login: async () => {},
  logout: () => {},
  modifyUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [userid, setUserid] = useState("");
  const [user, setUser] = useState(null);
  const { fetchPlaces } = useContext(PlacesContext);

  useEffect(() => {
    if (userid) {
      listenUserProfile(userid, (data) => setUser(data));
    }
  }, [userid]);

  const handleUserId = async (userId) => {
    if (userId) {
      setUserid(userId);
      const apiUser = await getUser(userId);
      setUser(apiUser);
      fetchPlaces(userId);
    }
  };

  const checkUser = async () => {
    const localId = await AsyncStorage.getItem(UserIdKey);
    await handleUserId(localId);
  };

  const login = async (email, password) => {
    const userCred = await signUserIn(email, password);
    if (userCred && userCred.user) {
      handleUserId(userCred.user.email);
      AsyncStorage.setItem(UserIdKey, userCred.user.email);
    }
  };

  const logout = () => {
    signUserOut();
    setUserid("");
    AsyncStorage.removeItem(UserIdKey);
  };

  const modifyUser = (newUserProps, sendToServer = true) => {
    if (!userid) {
      console.error("User ID is not there yet!");
      return;
    }
    const newUser = { ...user, ...newUserProps };
    setUser(newUser);
    if (sendToServer) updateUser({ id: userid, ...newUserProps });
  };

  return (
    <UserContext.Provider
      value={{ user, userid, checkUser, login, logout, modifyUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
