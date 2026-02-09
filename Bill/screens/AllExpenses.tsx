import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from 'components/ExpensesOutput'
import { DUMMY_EXPENSES } from 'components/type'
import { ExpensesContext } from 'store/expenses-context'

const AllExpenses = () => {
    const expensesCtx =  useContext(ExpensesContext)

  return (
    <ExpensesOutput expenses={expensesCtx.expenses} periodName='Total'/>
  )
}

export default AllExpenses