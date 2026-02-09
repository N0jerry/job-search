import { View, Text, Alert } from "react-native";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import IconButton from "components/UI/IconButton";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { LocationType, RootStackParamList } from "type";
import { RouteProp } from "@react-navigation/native";

type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Map"
>; //指定当前 navigation 属于 Map 路由
type MapScreenRouteProp = RouteProp<RootStackParamList, "Map">;

const Map = ({
  navigation,
  route,
}: {
  navigation: RootStackNavigationProp;
  route: MapScreenRouteProp;
}) => {
  const initialLocation = useMemo<LocationType | undefined>(() => {
    // 原代码属性名错误：route.params 应为 initialLat/initialLng（非 pickedLat）
    if (
      route.params &&
      typeof route.params.initialLat === "number" &&
      typeof route.params.initialLng === "number"
    ) {
      return {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
      };
    }
    return undefined; // 校验失败返回undefined，符合泛型定义
  }, [route.params]); // 依赖项：仅监听 route.params 变化

  const [selectedLocation, setSelectedLocation] =
    useState<LocationType | undefined>(initialLocation);
  const region = {
    latitude: initialLocation ? initialLocation.lat : 31.230391,
    longitude: initialLocation ? initialLocation.lng : 121.473628,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event: MapPressEvent) => {
    if (initialLocation) return;
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("标记一处地点");
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="定位"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
