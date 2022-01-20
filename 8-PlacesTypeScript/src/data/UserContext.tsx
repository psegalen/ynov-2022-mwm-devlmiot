import React, { createContext, FC, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUserIn, signUserOut } from "../firebase";
import { PlacesContext } from "./PlacesContext";
import { getUser, updateUser } from "./api";
import { UserFields } from "./types";

const UserIdKey = "USERID_KEY";

interface UserContextProps {
  user: UserFields | null;
  userid: string;
  checkUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  modifyUser: (newUserProps: UserFields, sendToServer?: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  userid: "",
  checkUser: async () => {},
  login: async () => {},
  logout: () => {},
  modifyUser: () => {},
});

export const UserProvider: FC = ({ children }) => {
  const [userid, setUserid] = useState<string>("");
  const [user, setUser] = useState<null | UserFields>(null);
  const { fetchPlaces } = useContext(PlacesContext);

  const handleUserId = async (userId: string | null) => {
    if (userId) {
      setUserid(userId);
      const apiUser = await getUser(userId);
      setUser(apiUser);
      fetchPlaces(userId);
    }
  };

  const checkUser = async () => {
    const localId = await AsyncStorage.getItem(UserIdKey);
    handleUserId(localId);
  };

  const login = async (email: string, password: string) => {
    const userCred = await signUserIn(email, password);
    if (userCred && userCred.user) {
      handleUserId(userCred.user.email);
      AsyncStorage.setItem(UserIdKey, userCred.user.email as string);
    }
  };

  const logout = () => {
    signUserOut();
    setUserid("");
    AsyncStorage.removeItem(UserIdKey);
  };

  const modifyUser = (newUserProps: UserFields, sendToServer = true) => {
    const newUser = { ...user, ...newUserProps };
    setUser(newUser);
    if (sendToServer && user) updateUser({ id: user.id, ...newUserProps });
  };

  return (
    <UserContext.Provider
      value={{ user, userid, checkUser, login, logout, modifyUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
