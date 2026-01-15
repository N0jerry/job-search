import { View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'

import { MealsOverviewScreenProps } from "types/navigation";

import { MEALS, CATEGORIES } from 'data/dummy-data';

import { Category, Meal } from "types/navigation";

import MealItem from 'components/MealItem';

const MealsOverviewScreen = ({ route, navigation }: MealsOverviewScreenProps) => {
    const catId = route.params.categoryId;
    
    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0//索引位置
    })
    //可以封装成函数
        useLayoutEffect(() => {

            const categoryTitle = CATEGORIES.find((category) => category.id === catId)?.title;
            navigation.setOptions({
                title: categoryTitle
            })
        },[catId, navigation])
        //


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
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}

export default MealsOverviewScreen