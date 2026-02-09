import { View, Text, Image, ScrollView, Button } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { Meal, MealDetailScreenProps } from 'types/navigation'
import { MEALS } from 'data/dummy-data'
import MealDetails from 'components/MealDetails'
import Subtitle from 'components/MealDetail/Subtitle'
import List from 'components/MealDetail/List'
import IconButton from 'components/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from 'store/redux/favorites'
import { Reducer } from '@reduxjs/toolkit'
import { RootState } from 'store/redux/store'
// import FavoritesContexProvider, { FavoritesContex } from 'store/context/favorites-context'



const MealDetailScreen = ({route, navigation}:MealDetailScreenProps) => {
    const mealId = route.params.mealId
    const selectedMeal: Meal | undefined = MEALS.find((meal) => meal.id === mealId);//find可能返回undefined
    //上下文状态
    // const favoriteMealIdsCtx = useContext(FavoritesContex)
    //redux状态
    const favoriteMealIds = useSelector((state:RootState) => state.favoriteMeals.ids)
    const dispatch = useDispatch()//执行导入的redux函数


    const MealDetailsProps = {
            duration: selectedMeal?.duration,
            complexity: selectedMeal?.complexity,
            affordability: selectedMeal?.affordability
        } as Meal
       
        // const mealIsFavorite = favoriteMealIdsCtx?.ids.includes(mealId)//useContext
        const mealIsFavorite = favoriteMealIds?.includes(mealId!)

        useLayoutEffect(() => {
            const headerFavoriteStatusHandler = () => {//ESLint 警告会消失，同时避免 useLayoutEffect 不必要的重复执行，符合 React Hooks 的最佳实践。
               if (mealIsFavorite) {
                //    favoriteMealIdsCtx?.removeFavorite(mealId)
                dispatch(removeFavorite({id: mealId!}))
               } else {
                //    favoriteMealIdsCtx?.addFavorite(mealId)
                dispatch(addFavorite({id: mealId!}))
               }
            }
            

            navigation.setOptions({
                
                headerRight: () => {
                    return (


                            <IconButton 
                            name={ mealIsFavorite ? 'star' : 'star-outline'} 
                            color="white" 
                            onPress={headerFavoriteStatusHandler}/>

                    )
                }


            })
        }, [navigation, mealIsFavorite, mealId, dispatch])
    
  return (
    

    <ScrollView className='mb-8'>

    <View>
        <Image className='w-full h-[350]' source={{uri: selectedMeal?.imageUrl}}/>
        <Text className='font-bold text-[24px] m-2 text-center color-white'>菜品详情页{mealId}</Text>
        <MealDetails textStyle={{color:'white'}} {...MealDetailsProps} className='color-white'/>
        <View className='items-center'>
        <View className='w-[80%]' >
            <Subtitle>Ingredients食材</Subtitle>
            <List data={selectedMeal?.ingredients}/>
            <Subtitle>Steps下一步</Subtitle>
            <List data={selectedMeal?.steps}/>
        </View>
        </View>

    </View>
    </ScrollView>
    
  )
}

export default MealDetailScreen