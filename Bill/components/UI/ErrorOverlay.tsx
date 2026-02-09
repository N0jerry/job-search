import { View, Text, ActivityIndicator} from 'react-native'
import React from 'react'
import Button from './Button'

const LoadingOverlay = ({message,onConfirm}: {message?:string, onConfirm?: ()=> void}) => {
  return (
    <View className='flex-1 justify-center items-center p-6 bg-primary700'>
      <Text className='text-center m-2 color-white text-[20px]'>出错了</Text>
      <Text className='text-center m-2 color-white'>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}

export default LoadingOverlay