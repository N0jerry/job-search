import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Place from "models/place";
export type LocationType = {
  lat: number;
  lng: number;
};
export type LocationTypeAddress  = {
  lat: number;
  lng: number;
  address: string;
};
//导航
export type RootStackParamList = {
  Map?: {
    initialLat?: number;
    initialLng?: number;
  };
  AllPlace?: {
    place: Place;
  };
  AddPlace?: {
    pickedLat: number;
    pickedLng: number;
  };
  PlaceDetails: {
    placeId: number;
  };
};

export interface PlaceDBRecord {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}

