import { View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import React from 'react'
import Meal from 'models/meal'
import MealItem from './MealItem'

const MealsList = ({items}: {items:Meal[]}) => {
    const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
        const item = itemData.item
        
        const mealItemProps  = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration
        } as Meal//直接断言,避免必选项报错

        return <MealItem  {...mealItemProps} />

    }
  return (
    <View className='flex-1 p-4'>
          <FlatList 
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderMealItem}
          />
        </View>
  )
}

export default MealsList