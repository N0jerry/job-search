import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNode } from "react";


export const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.99,
        date: new Date('2022-01-19')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-11-1')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-2-09')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e6',
        description: 'Some bananas',
        amount: 75.99,
        date: new Date('2026-01-30')
    },
    {
        id: 'e7',
        description: 'A book',
        amount: 14.99,
        date: new Date('2026-01-17')
    },
    {
        id: 'e8',
        description: 'Another book',
        amount: 188.99,
        date: new Date('2026-01-16')
    },

]
export interface Expense {
  id: string,
  description: string;
  amount: number;
  date: Date;
}

export type ExpensesType = typeof DUMMY_EXPENSES;
export interface ExpensesOutputProps {
    expenses?: ExpensesType; // 使用上面定義的 Expense[] 類型
    periodName?: string;
    fallbackText?: ReactNode;
    
}
export type RootStackParamList = {
  ManageExpense: {
    expenseId?: ExpensesType[0]['id']
  }
  ExpensesOverview: undefined
};
export type ManageExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ManageExpense'
  
>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
