import { CATEGORIES } from "data/dummy-data";

import { View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import React from 'react'
import CategoryGridTile from "components/CategoryGridTile";
import { Category, MealsCategoriesScreenProps } from "types/navigation";





const CategoriesScreen = ({ navigation }: MealsCategoriesScreenProps) => {
const renderCategoryItem = (itemData: ListRenderItemInfo<Category>) => {
    
  const pressHandler = ()  => {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id
      })

    }
  return (
    <CategoryGridTile 
    title={itemData.item.title}  
    color={itemData.item.color}
    onPress={pressHandler}
    />
    );


}


  return ( 
    
      <FlatList 
      
      data={CATEGORIES} 
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
      
      />

  )

}

export default CategoriesScreen