import React, { createContext, FC, useState } from "react";
import { createPlace, getPlaces } from "./api";
import { AddPlaceInput, Place } from "./types";

interface PlacesContextProps {
  places: Place[];
  fetchPlaces: (userId: string) => Promise<void>;
  addPlace: (data: AddPlaceInput, userid: string) => Promise<void>;
}

export const PlacesContext = createContext<PlacesContextProps>({
  places: [],
  fetchPlaces: async () => {},
  addPlace: async () => {},
});

export const PlacesProvider: FC = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const fetchPlaces = async (userId: string) => {
    const apiPlaces = await getPlaces(userId);
    setPlaces(apiPlaces);
  };
  const addPlace = async (data: AddPlaceInput, userid: string) => {
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
