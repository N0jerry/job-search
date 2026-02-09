import { View, Text, Alert, Image } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import OutlineButton from "components/UI/OutlineButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  LocationAccuracy,
} from "expo-location"; //获取用户当前位置
import getMapPreview, { getAddress } from "util/location";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LocationType, LocationTypeAddress, RootStackParamList } from "type";
// import {  } from 'react-native-maps';
// type LocationType = {
//   lat: number;
//   lng: number;
//   address?: { lat: number; lng: number};
// };
// export type RootStackParamList = {
//   Map: undefined;
//   AddPlace: {
//     pickedLat: number;
//     pickedLng: number;
//   };
// };
type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList,"Map">;
//
type MapScreenRouteProp = RouteProp<RootStackParamList, "AddPlace">;

const LocationPicker = ({
  onPickLocation,
}: {
  onPickLocation: (location: LocationTypeAddress ) => void;
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<MapScreenRouteProp>();

  const [pickedLocation, setPickedLocation] = useState<LocationType | null>(
    null,
  );
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({...pickedLocation, address:address});
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert("定位未授权,请授权");
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const location = await getCurrentPositionAsync({
      // 强制高精度，这会促使 Android 系统去读取 GPS 硬件层（也就是 adb 注入的那层）
      // accuracy: LocationAccuracy.Lowest,
      // 允许等待稍微久一点
    }); //实时位置
    // 添加这行 Log，查看时间戳和坐标
    console.log("获取到的定位:", location);

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = useMemo(() => {
    if (!pickedLocation) {
      return <Text>尚未选择位置</Text>;
    }

    return (
      <Image
        className="w-full h-full"
        source={{
          uri: getMapPreview(pickedLocation.lng, pickedLocation.lat),
        }}
      />
    );
  }, [pickedLocation]); // 依赖项：只有 pickedLocation 变化时才重新执行

  return (
    <View>
      <View className="w-full h-[200px] my-2 justify-center items-center bg-primary100 rounded-md overflow-hidden">
        {locationPreview}
      </View>
      <View className="flex-row justify-around items-center ">
        <OutlineButton name="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton name="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;
