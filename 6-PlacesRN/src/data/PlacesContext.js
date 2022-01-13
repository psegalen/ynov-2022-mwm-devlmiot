import React, { createContext, useState } from "react";
import { createPlace, getPlaces } from "./api";

export const PlacesContext = createContext({
  places: [],
  fetchPlaces: () => {},
  addPlace: () => {},
});

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const fetchPlaces = async (userId) => {
    const apiPlaces = await getPlaces(userId);
    setPlaces(apiPlaces);
  };
  const addPlace = async (data, userid) => {
    const finalPlace = {
      id: `${userid}|${data.place.place_id}`,
      userId: userid,
      rate: data.rate,
      comment: data.comment,
      place: {
        id: data.place.place_id,
        name: data.place.name,
        location: {
          _latitude: data.place.geometry.location.lat,
          _longitude: data.place.geometry.location.lng,
        },
      },
    };
    createPlace(finalPlace);
    const newPlaces = [finalPlace, ...places];
    setPlaces(newPlaces);
  };

  return (
    <PlacesContext.Provider value={{ places, fetchPlaces, addPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};
