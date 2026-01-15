import { View, Text, TextProps } from 'react-native'
import React from 'react'

const Subtitle = ({children}:TextProps) => {
  return (
    <View className='my-1 mx-3 p-2 border-b-2 border-b-[#e2b497]'>
        <Text className='color-[#e2b497] text-[18px] font-bold text-center '>{children}</Text>
    </View>
  )
}

export default Subtitle