import { View, Text, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerResult,
} from "expo-image-picker";
import OutlineButton from "components/UI/OutlineButton";
//
const ImagePicker = ({onTakeImage}:{onTakeImage:(arg0: string)=> void}) => {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    //验证权限的函数,返回布尔
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert("相机未授权,请授权");
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      //未授权就取消
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5, //限制图片分辨率
    });
    setPickedImage(image.assets![0].uri);
    // console.log(image);
    onTakeImage(image.assets![0].uri)
  };
  let imagePreview = <Text>还没有拍摄</Text>;
  if (pickedImage) {
    imagePreview = <Image className="w-full h-full" source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View className="w-full h-[200px] my-2 justify-center items-center bg-primary100 rounded-md overflow-hidden">{imagePreview}</View>
      <OutlineButton name="camera" onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>
  );
};
export default ImagePicker;
