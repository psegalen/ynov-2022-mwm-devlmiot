import { Alert } from "react-native";
import { Place, UserFields } from "./types";

const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    Alert.alert(
      "Erreur lors de la récupération des données",
      (err as Error).message
    );
  }
};

const sendData = async <T>(url: string, data: T, method: string) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    Alert.alert(
      "Erreur lors de la mise à jour des données",
      (err as Error).message
    );
  }
};

export const getPlaces = async (userId: string) =>
  getData(
    `https://europe-west1-ynov-todos.cloudfunctions.net/places?userId=${userId}`
  );

export const createPlace = async (place: Place) =>
  sendData<Place>(
    `https://europe-west1-ynov-todos.cloudfunctions.net/place?placeId=${place.id}`,
    place,
    "POST"
  );

export const getUser = async (userId: string) =>
  getData(
    `https://europe-west1-ynov-todos.cloudfunctions.net/user?userId=${userId}`
  );

export const updateUser = async (userFields: UserFields) =>
  sendData<UserFields>(
    `https://europe-west1-ynov-todos.cloudfunctions.net/user?userId=${userFields.id}`,
    userFields,
    "PATCH"
  );
