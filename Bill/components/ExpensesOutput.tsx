import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { DUMMY_EXPENSES, ExpensesOutputProps } from './type'




const ExpensesOutput = ({expenses, periodName, fallbackText }:ExpensesOutputProps) => {
  let content = <Text className='color-white text-[16px] text-center mt-8'>{fallbackText}</Text>
  if (expenses!.length > 0) {
    content = <ExpensesList expenses={expenses}/>
    
  }
  return (
    <View className=' bg-primary700 flex-1 pt-6 pb-0 px-6'>
      <ExpensesSummary expenses={expenses} periodName={periodName}/>
      {content}
      
    </View>
  )
}

export default ExpensesOutput