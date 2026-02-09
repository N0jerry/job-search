import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Place from "models/place";

const PlaceItem = ({
  place,
  onSelect,
}: {
  place: Place;
  onSelect: (id:number) => void;
}) => {
  return (
    <Pressable
      onPress={onSelect?.bind(this, place.id)}
      style={{
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
      }}
      className="flex-row items-center rounded-md my-3 bg-primary500 active:opacity-90"
    >
      <Image
        source={{ uri: place.imageUri }}
        style={{ width: 100, height: 100 }}
        className="rounded-bl-[4] rounded-tl-[4]"
      />
      <View className="flex-2 p-3">
        <Text className="font-bold text-[18px] color-gray-700">
          {place.title}
        </Text>
        <Text className="font-bold text-[12px]  color-gray-700">
          {place.address}
        </Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
