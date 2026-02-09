import "./global.css"
import { View, Text } from 'react-native'
import React from 'react'
import CategoriesScreen from 'screens/CategoriesScreen'
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"//基础层
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MealsOverviewScreen from "screens/MealsOverviewScreen"
import { DrawerParamList, RootStackParamList } from "types/navigation"
// import { MealsOverviewScreenProps } from "types/navigation";
import MealDetailScreen from "screens/MealDetailScreen"
import { createDrawerNavigator } from "@react-navigation/drawer"
import FavoritesScreen from "screens/FavoritesScreen"
import Ionicons from '@expo/vector-icons/Ionicons'
import FavoritesContexProvider from "store/context/favorites-context"
import { Provider } from "react-redux"
import store from "store/redux/store"//状态



//功能层

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>()

 const DrawerNavigator= () => {
  return (
    

  <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#351401' },
      headerTintColor: 'white',
      sceneStyle: { backgroundColor: '#3f2f25' },
      drawerContentStyle: {backgroundColor: '#351401'},
      drawerInactiveTintColor:  'white',
      drawerActiveTintColor: '#351401',
      drawerActiveBackgroundColor: '#e4baa1',
    }}
  >
    <Drawer.Screen name="Categories" component={CategoriesScreen}
    options={{
      title: '分类',
      drawerIcon: ({ color, size}) => (
        <Ionicons name="list" color={color}  size={size}/>
      )
    }}/>
    <Drawer.Screen 
    name="Favorites" 
    component={FavoritesScreen}
    options={{
      drawerIcon: ({ color, size}) => (
        <Ionicons name="star" color={color}  size={size}/>
      )
    }}
    />

  </Drawer.Navigator>

  )
}

const App = () => {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavoritesContexProvider> */}
    <Provider store={store}>

      <NavigationContainer >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' }
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              
              headerShown: false
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
          options={{
            title: '菜品详情'

          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
      {/* </FavoritesContexProvider> */}
    </>
  )
}

export default App