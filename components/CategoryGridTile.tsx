import { View, Text, Pressable, Platform } from 'react-native'
import React from 'react'
// import { useNavigation } from '@react-navigation/native'


interface CategoryGridTileType {
    title?: string,
    color?: string
    onPress?: () => void
}

const CategoryGridTile = ({title, color,onPress}: CategoryGridTileType) => {
    // const navigation = useNavigation()
  return (
    <View style={{
        
        shadowColor: 'black', // 阴影颜色（必填）
        shadowOffset: { width: 0, height: 2 }, // 阴影偏移
        shadowOpacity: 0.25, // 你要的透明度
        shadowRadius: 8, // 阴影模糊半径
        elevation: 5, // Android 阴影（补充）
        overflow: Platform.OS === 'android' ? 'hidden': 'visible'
  }}
   className='flex-1 m-4 h-[150] rounded-lg '
   >
      <Pressable 
      className='flex-1 active:opacity-50 ' 
      android_ripple={{color: '#ccc', foreground: true}}
      onPress={onPress}
      >
        <View style={{backgroundColor: color}} className={`flex-1 p-4  items-center justify-center rounded-lg`}>
            <Text className='font-bold text-[18px]  '>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CategoryGridTile