import { Alert } from "react-native";

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    Alert.alert(
      "Erreur lors de la récupération des données",
      err.message
    );
  }
};

const sendData = async (url, data, method) => {
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
      err.message
    );
  }
};

export const getPlaces = async (userId) =>
  getData(
    `https://europe-west1-ynov-todos.cloudfunctions.net/places?userId=${userId}`
  );

export const createPlace = async (place) =>
  sendData(
    `https://europe-west1-ynov-todos.cloudfunctions.net/place?placeId=${place.id}`,
    place,
    "POST"
  );

export const getUser = async (userId) =>
  getData(
    `https://europe-west1-ynov-todos.cloudfunctions.net/user?userId=${userId}`
  );

export const updateUser = async (userFields) =>
  sendData(
    `https://europe-west1-ynov-todos.cloudfunctions.net/user?userId=${userFields.id}`,
    userFields,
    "PATCH"
  );
