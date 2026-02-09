import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from 'components/ExpensesOutput'
import { DUMMY_EXPENSES, Expense } from 'components/type'
import { ExpensesContext } from 'store/expenses-context'
import { getDateMinusDays } from 'util/date'
import { fetchExpenses } from 'util/http'
import LoadingOverlay from 'components/UI/LoadingOverlay'
import ErrorOverlay from 'components/UI/ErrorOverlay'

const RecentExpenses = () => {
  const expensesCtx =  useContext(ExpensesContext)
  // const [fetchedExpenses, setFetchedExpenses] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses =  await fetchExpenses()
        expensesCtx.setExpense(expenses)

      } catch (error) {
        setError('数据加载失败,请检查网络')
      }
      // setFetchedExpenses(expenses)
      setIsFetching(false)
      
    }
    getExpenses()
    
  },[])

  function errorHandler() {
    setError('')
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7)

    return (expense.date > date7DaysAgo) && (expense.date <= today)


  })

  return (
     <ExpensesOutput 
     expenses={recentExpenses} 
     periodName='Last 7 Days'
     fallbackText="近 7 天暂无支出记录"
     />
  )
}

export default RecentExpenses