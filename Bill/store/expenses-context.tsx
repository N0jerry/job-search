import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useReducer } from 'react'
import { DUMMY_EXPENSES, Expense } from 'components/type'


interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expenseData:Expense) => void,
  setExpense: (expenses:Expense[]) => void,//
  deleteExpense: (id: string) => void,
  updateExpense: (id: string, expenseData:Omit<Expense, 'id'>) => void
}
export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpense: (expenses:Expense[]) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
})

const expensesReducer= (state:Expense[], action:any) => {
    switch (action.type) {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            
            return [{...action.payload,...state}, ...state];
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default: 
            return state;
    }
}

const ExpensesContextProvider = ({children}:{children:ReactNode}) => {

    const [expensesState, dispatch] = useReducer(expensesReducer,[]);

    const addExpense = (expenseDate:Omit<Expense, 'id'>) => {
            dispatch({ type: 'ADD', payload: expenseDate })
    }
    const setExpense = (expenses:Expense[]) => {
        dispatch({ type: 'SET', payload: expenses})
    }

    const deleteExpense = (id:string) => {
        dispatch({ type: 'DELETE', payload: id})
    }

    const updateExpense = (id:string, expenseData:Omit<Expense, 'id'>) => {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}})
    }
    const value = {
        expenses: expensesState,
        setExpense: setExpense,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense

    }

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}
export default ExpensesContextProvider;

