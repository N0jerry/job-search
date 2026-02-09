import axios from 'axios'
import { Expense } from 'components/type'
import { Platform } from 'react-native';

const BACKEND_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const storeExpense = async  (expenseData:Omit<Expense, 'id'>) => {
    const response =await axios.post(
        BACKEND_URL + '/expenses.json',
        expenseData
    )
    const id = response.data.id
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(
        BACKEND_URL + '/expenses.json'
    )
    const expenses = []
    console.log(response.data)
    for (const key in response.data) {
        const expenseObj = {
            id: key,//// 输出数组索引（字符串类型）
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),//测试
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }
    return expenses

    
}
export function updateExpense(id:string,expenseData:Omit<Expense, "id">) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
    
}

export function deleteExpense(id:string) {
     return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
    
}