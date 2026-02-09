import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import MealsList from 'components/MealsList/MealsList'
import { FavoritesContex } from 'store/context/favorites-context'
import { MEALS } from 'data/dummy-data'
import { useSelector } from 'react-redux'
import { RootState } from 'store/redux/store'


const FavoritesScreen = () => {
    // const favoriteMealIdsCtx = useContext(FavoritesContex);
    const favoriteMealIds = useSelector((state:RootState) => state.favoriteMeals.ids)

    // const favoriteMealIds = MEALS.filter((meal) => 
    //     favoriteMealIdsCtx?.ids.includes(meal.id)
    // )
    const favoriteMeals = MEALS.filter((meal) => 
        favoriteMealIds?.includes(meal.id)
    )
    if (favoriteMealIds.length === 0) {
        return (
            <View>
                <Text>您还没有收藏美食</Text>
            </View>
        )
    }
  return (
    <MealsList items={favoriteMeals}/>
  )
}

export default FavoritesScreen