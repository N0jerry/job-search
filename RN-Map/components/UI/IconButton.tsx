import { View, Text, Pressable,PressableProps } from 'react-native'
import React, { ComponentProps } from 'react'
import { Ionicons  } from '@expo/vector-icons'

type IoniconsProps = ComponentProps<typeof Ionicons>;
type IconButtonProps = IoniconsProps & {
  onPress: PressableProps['onPress'];
};

const IconButton = ({name, size, color, onPress}:IconButtonProps) => {
  return (
    <Pressable onPress={onPress} className='p-2  justify-center items-center active:opacity-70'>
        <Ionicons name={name} size={size} color={color} />
    </Pressable>
  )
}

export default IconButton