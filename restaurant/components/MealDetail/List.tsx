import { View, Text } from 'react-native'
import React from 'react'
import { Meal } from 'types/navigation'


const List = ({data}:{data:Meal["ingredients"] | Meal["steps"] | undefined}) => {
  return (
    <>
    {data?.map((dataPoint) => (
        <View key={dataPoint} className='rounded-md px-2 py-1 mx-3 my-1 bg-[#e2b497]'>
            <Text className='color-[#351401] text-center'> {dataPoint} </Text>
        </View>
        ))}
    </>
)
}

export default List