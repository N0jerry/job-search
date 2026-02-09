import { View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import React from 'react'
import { ExpensesOutputProps,ExpensesType } from './type'
import ExpenseItem from './ExpenseItem'

const renderExpenseItem = (itemData:ListRenderItemInfo<ExpensesType[0]>) =>{
        return (
            <ExpenseItem {...itemData.item}/>
        )
    }

const ExpensesList = ({expenses}:ExpensesOutputProps) => {
    
  return (
   <FlatList 
   data={expenses}
   renderItem={renderExpenseItem}
   keyExtractor={(item) => item.id}



   />
  )
}

export default ExpensesList