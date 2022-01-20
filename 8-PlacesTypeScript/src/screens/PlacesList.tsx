import React, { FC, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { PlacesContext } from "../data/PlacesContext";

const PlacesList: FC = () => {
  const { places } = useContext(PlacesContext);
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 44.842,
        longitude: -0.584,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {places.map((p) => (
        <Marker
          key={p.id}
          coordinate={{
            latitude: p.place.location._latitude,
            longitude: p.place.location._longitude,
          }}
          title={p.place.name}
          description={`Note : ${p.rate} / ${p.comment}`}
        />
      ))}
    </MapView>
  );
};

export default PlacesList;
