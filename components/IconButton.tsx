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
    <View style={{ overflow: 'hidden' }}>

    <Pressable style={{}} onPress={onPress} className='active:opacity-70 mx-3'>
        <Ionicons name={name} size={24} color={color}/>
    </Pressable>
    </View>
    
  )
}

export default IconButton