import { View, Text, FlatList } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import Place from "models/place";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "type";

type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList,"PlaceDetails">;


const PlacesList = ({ places }: { places: Place[] }) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const selectPlaceHandler = (id: number) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  };
  if (!places || places.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-[16px] text-primary200">
          还没有添加任何地点 - 开始添加一些吧！
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={{ margin: 24 }}
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlacesList;
