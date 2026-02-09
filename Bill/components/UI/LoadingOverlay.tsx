import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingOverlay = () => {
  return (
    <View className='flex-1 justify-center items-center p-6 bg-primary700'>
      <ActivityIndicator size="large" color="white"/>
    </View>
  )
}

export default LoadingOverlay