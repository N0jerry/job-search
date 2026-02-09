import { View, Text } from 'react-native'
import React from 'react'
import PlaceForm from 'components/Places/PlaceForm'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Place from 'models/place';
import { RootStackParamList } from 'type';
import { insertPlace } from 'util/database';


export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList,'AllPlace'>;//指定当前 navigation 属于 Map 路由
  
const AddPlace = ({ navigation }:{navigation:RootStackNavigationProp}) => {
  const createPlaceHandler = async (place:Place) =>{
    await insertPlace(place)//将数据插入到数据库
    navigation.navigate('AllPlace')


  }
  return (
    <PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

export default AddPlace