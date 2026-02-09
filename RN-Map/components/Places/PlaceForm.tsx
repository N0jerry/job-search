import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "components/UI/Button";
import Place from "models/place";
import { LocationTypeAddress } from "type";

const PlaceForm = ({onCreatePlace}:{onCreatePlace:(arg0: Place)=> void}) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState<LocationTypeAddress>();
  const [selectedImage, setSelectedImage] = useState("");

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };
  //
  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };
  const pickLocationHandler = useCallback((location: LocationTypeAddress) => {
    setPickedLocation(location);
  }, []);
  const savePlaceHandler = () => {//添加
    // console.log(enteredTitle)
    // console.log(selectedImage)
    // console.log(pickedLocation)
     if (!enteredTitle || !selectedImage || !pickedLocation) {
      // 你可以使用 Alert.alert 提示用户
      // Alert.alert('输入无效', '请确保您已输入标题、拍摄照片并选择了位置。');
      console.log('请填写完整信息');
      return; 
    }
    const placeData = new Place(enteredTitle, selectedImage,pickedLocation)
    onCreatePlace(placeData)
    // console.log('3',enteredTitle)



  };
  return (
    <ScrollView className="flex-1 p-6 ">
      <View>
        <Text className="font-bold mb-1 color-primary500">添加地点的表单</Text>
        <TextInput
          className="my-2 px-1 py-2 text-[16px] border-b-primary700 border-b-2 bg-primary100"
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;
