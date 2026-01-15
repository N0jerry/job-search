import "./global.css"
import { View, Text } from 'react-native'
import React from 'react'
import CategoriesScreen from 'screens/CategoriesScreen'
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"//基础层
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MealsOverviewScreen from "screens/MealsOverviewScreen"
import { RootStackParamList } from "types/navigation"
import { MealsOverviewScreenProps } from "types/navigation";
import MealDetailScreen from "screens/MealDetailScreen"
import { createDrawerNavigator } from "@react-navigation/drawer"

//功能层

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer:ReturnType<typeof createDrawerNavigator>= createDrawerNavigator()

const DrawerNavigator= () => {
  return (
  <Drawer.Navigator>
    <Drawer.Screen />

  </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' }
          }}
        >
          <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{
              title: '分类'
            }}
          />
          <Stack.Screen 
          name="MealsOverview" 
          component={MealsOverviewScreen} 
          // options={({route, navigation}:MealsOverviewScreenProps) => {
          //   const catId = route.params.categoryId
          //   return {
          //     title: catId

          //   }
          // }}
          />
          <Stack.Screen  
          name="MealDetail" 
          component={MealDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App