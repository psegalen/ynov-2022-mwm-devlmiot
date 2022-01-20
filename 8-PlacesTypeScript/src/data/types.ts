import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

interface GPlace {
  id: string;
  name: string;
  location: {
    _latitude: number;
    _longitude: number;
  };
}

export interface Place {
  id: string;
  place: GPlace;
  rate: number;
  comment: string;
  userId: string;
}

export interface UserFields {
  avatar?: string;
  id?: string;
  name?: string;
  token?: string;
}

export interface AddPlaceInput {
  place: GooglePlaceDetail;
  rate: number;
  comment: string;
}
