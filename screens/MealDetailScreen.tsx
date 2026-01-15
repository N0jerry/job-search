import { View, Text, Image, ScrollView, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Meal, MealDetailScreenProps } from 'types/navigation'
import { MEALS } from 'data/dummy-data'
import MealDetails from 'components/MealDetails'
import Subtitle from 'components/MealDetail/Subtitle'
import List from 'components/MealDetail/List'
import IconButton from 'components/IconButton'



const MealDetailScreen = ({route, navigation}:MealDetailScreenProps) => {
    const mealId = route.params.mealId
    const selectedMeal: Meal | undefined = MEALS.find((meal) => meal.id === mealId);//find可能返回undefined

    const MealDetailsProps = {
            duration: selectedMeal?.duration,
            complexity: selectedMeal?.complexity,
            affordability: selectedMeal?.affordability
        } as Meal
       

        useLayoutEffect(() => {
             const headerButtonPressHandler = () => {//ESLint 警告会消失，同时避免 useLayoutEffect 不必要的重复执行，符合 React Hooks 的最佳实践。
                console.log('Pressed!')
            }
            navigation.setOptions({
                headerRight: () => {
                    return <IconButton name="star" color="white" onPress={headerButtonPressHandler}/>
                }


            })
        }, [navigation])
    
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