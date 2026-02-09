import { View, Text, Pressable, Image, Platform } from 'react-native'
import React from 'react'
import {  Meal ,RootStackNavigationProp } from "types/navigation";
import { useNavigation } from '@react-navigation/native';
import MealDetails from '../MealDetails';



const MealItem = ({id,title,imageUrl,duration,complexity,affordability}:Meal) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    
    const selectMealItemHandler = () => {
        navigation.navigate('MealDetail',{
            mealId: id,
        });
    }
    const MealDetailsProps = {
        duration: duration,
        complexity: complexity,
        affordability: affordability
    } as Meal

    return (
    <View style={{
            shadowColor: 'black', // 阴影颜色（必填）
            shadowOffset: { width: 0, height: 2 }, // 阴影偏移
            shadowOpacity: 0.35, // 你要的透明度
            shadowRadius: 1, // 阴影模糊半径
            elevation: 4, // Android 阴影（补充）  
            overflow: Platform.OS === 'android' ? 'hidden': 'visible' 

      }} 
      className='m-4 rounded-lg  bg-white'>
        <Pressable 
        className='flex-1 active:opacity-50 '
        android_ripple={{ color:'#ccc' }}
        onPress={selectMealItemHandler}
        >
            <View className='rounded-lg overflow-hidden'>
            <View>
                <Image source={{uri: imageUrl}} className='w-full h-[200]'/>
                <Text className='font-bold text-center text-[18px] m-2'>{title}</Text>
            </View>

            <MealDetails {...MealDetailsProps} />
            </View>
        </Pressable>
    </View>
  )
}

export default MealItem