import { View, Text } from 'react-native'
import React from 'react'
import { ExpensesOutputProps } from './type'


const ExpensesSummary = ({expenses,periodName}:ExpensesOutputProps) => {
    const expensesSum = expenses?.reduce((sum,expense) => {
        return sum + expense.amount;
    },0)
    
    return(
    <View className='p-2 bg-primary50 rounded-md flex-row justify-between items-center'>
        <Text className='text-[12px] color-primary400'>{ periodName }</Text>
        <Text className='text-[16px] font-bold color-primary500'>${ expensesSum?.toFixed(2) }</Text>
    </View>
    )
}

export default ExpensesSummary