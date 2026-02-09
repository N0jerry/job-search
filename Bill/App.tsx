import { View, Text } from 'react-native'
import "./global.css"
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ManageExpense from 'screens/ManageExpense'
import RecentExpenses from 'screens/RecentExpenses'
import AllExpenses from 'screens/AllExpenses'
import { GlobalStyles } from 'constants/styles'
import { Ionicons } from '@expo/vector-icons'
import IconButton from 'components/UI/IconButton'
import { RootStackParamList } from 'components/type'
import ExpensesContextProvider from 'store/expenses-context'

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator 
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => 
        <IconButton 
          name='add' 
          color={tintColor}
          onPress={() => {
            navigation.navigate('ManageExpense')
          }}/>

    })}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses}
      options={{
        title: '近期支出',
        tabBarLabel: '近期',
        tabBarIcon: ({color,size}) => (
          <Ionicons name="hourglass" size={size} color={color}/>
        )
      }}
      />
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses}
      options={{
        title: '全部支出',
        tabBarLabel: '全部',
        tabBarIcon: ({color,size}) => (
          <Ionicons name="calendar" size={size} color={color}/>
        )
      }}/>
    </BottomTabs.Navigator>
  )
}

const App = () => {
  return (
    <>
    <StatusBar style='auto'/>
    <ExpensesContextProvider>

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white'
        }}
      
      >
        <Stack.Screen 
        name="ExpensesOverview" 
        component={ExpensesOverview}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen name="ManageExpense" component={ManageExpense} 
        options={{
          // title: '管理开支'
          presentation: 'modal',//以模态展开
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
      

    </>
  )
}

export default App