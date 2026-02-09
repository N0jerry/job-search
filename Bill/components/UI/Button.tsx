import { View, Text, Pressable, TextProps, GestureResponderEvent,StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
// import { StyleProp } from 'react-native/types_generated/index';


interface ButtonProps {
  children?: ReactNode;// 支持文字、圖標或其他組件
  onPress?: (event: GestureResponderEvent) => void;
  mode?: string
  style?: StyleProp<ViewStyle>
}

const Button = ({children, onPress, mode, style}:ButtonProps) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress} className='active:opacity-75 active:bg-primary100 active:rounded-md'>
        <View  className={`rounded-md p-2 bg-primary500 ${ mode === 'flat' && 'bg-transparent'}`}>
            <Text className={`text-white text-center  ${ mode === 'flat' &&'color-primary200' }`}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button