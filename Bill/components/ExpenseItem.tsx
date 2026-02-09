import { View, Text, ListRenderItemInfo, Pressable } from 'react-native'
import React from 'react'
import { ExpensesType, RootStackNavigationProp } from './type'
import { GlobalStyles } from 'constants/styles'
import { getFormattedDate } from 'util/date'
import { useNavigation } from '@react-navigation/native'
//费用项
const ExpenseItem = ({id,description, amount, date}:ExpensesType[0]) => {
    const navigation = useNavigation<RootStackNavigationProp>()

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', {
            expenseId: id
        })

    }
  return (
   <Pressable onPress={expensePressHandler} className='active:opacity-75'>
    <View style={{elevation: 3, shadowColor: GlobalStyles.colors.gray500, shadowRadius: 4, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.4}} 
    className='p-3 my-2 bg-primary500 flex-row justify-between rounded-md '
    >
        <View >
            <Text className='color-primary50 text-[16px] mb-4 font-bold'>{description}</Text>
            <Text className='color-primary50 '>{ getFormattedDate(date) }</Text>
        </View>
        <View className='py-3 px-1 bg-white justify-center items-center rounded-md min-w-20 min-h-2'>
            <Text className='color-primary500'>${amount.toFixed(2)}</Text>
        </View>
    </View>
   </Pressable>
  )
}

export default ExpenseItem