import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import type { IconProps } from '@expo/vector-icons/build/createIconSet';

type IoniconsGlyphs = keyof typeof Ionicons.glyphMap

interface IconButtonType extends IconProps<IoniconsGlyphs> {
    onPress?:()=>void

}
const IconButton = ({name, color,onPress}:IconButtonType) => {
  return (
    // <View style={{ overflow: 'hidden' }}>

    <Pressable  onPress={onPress} className='rounded-3xl p-2 mx-2 my-1 active:opacity-70'>
        <Ionicons name={name} size={24} color={color}/>
    </Pressable>
    // </View>
    
  )
}

export default IconButton