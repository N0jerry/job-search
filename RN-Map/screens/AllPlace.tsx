import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PlacesList from "components/Places/PlacesList";
import { useIsFocused, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "type";
import Place from "models/place";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchPlaces } from "util/database";

type AllPlacesRouteProp = NativeStackScreenProps<
  RootStackParamList,
  "AllPlace"
>;

const AllPlaces = ({ route }: AllPlacesRouteProp) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const  places =  await fetchPlaces();
      setLoadedPlaces(places)
    }
    if (isFocused) {
      // const newPlace = route.params.place; // 提前解构：TS 确认 place 非空，临时变量类型为确定的非空类型
      // setLoadedPlaces((curPlaces) => [...curPlaces, newPlace]);
      loadPlaces();
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
