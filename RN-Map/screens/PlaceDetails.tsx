import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import OutlineButton from "components/UI/OutlineButton";
import { fetchPlaceDetails } from "util/database";
import { LocationType, LocationTypeAddress, RootStackParamList } from "type";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Place from "models/place";

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PlaceDetails"
>; 

type MapScreenRouteProp = RouteProp<RootStackParamList, "PlaceDetails">;

const PlaceDetails = ({ route,navigation }: {
  navigation: RootStackNavigationProp;
  route: MapScreenRouteProp;
}) => {
    const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null)
  const shownOnMapHandler = () => {
    if (!fetchedPlace) return;
    navigation.navigate('Map', {
        initialLat: fetchedPlace.location.lat,
        initialLng: fetchedPlace.location.lng,
    })
  };
  
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function loadPlaceData() {
        // console.log(selectedPlaceId)
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place)
      navigation.setOptions({
        title: place?.title,
      })
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Loading...</Text>
        </View>

    )
  }

  return (
    <ScrollView>
      <Image className="h-[30%] min-h-[300] w-full" source={{uri: fetchedPlace.imageUri}}/>
      <View className="justify-center items-center">
        <View className="p-5">
          <Text className="color-primary500 text-center font-bold text-[16px]">
            {fetchedPlace.address}
          </Text>
        </View>
        <OutlineButton name="map" onPress={shownOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
