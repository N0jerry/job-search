import { View, Text, TextInput } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {  Expense, ManageExpenseScreenProps, RootStackNavigationProp } from 'components/type'
import IconButton from 'components/UI/IconButton';
import { GlobalStyles } from 'constants/styles';
import Button from 'components/UI/Button';
import { ExpensesContext } from 'store/expenses-context';
import ExpenseForm from 'components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense,updateExpense } from 'util/http';
import LoadingOverlay from 'components/UI/LoadingOverlay';
import ErrorOverlay from 'components/UI/ErrorOverlay';


const ManageExpense = ({route, navigation}: ManageExpenseScreenProps) => {
    const expensesCtx =  useContext(ExpensesContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const editedExpenseId = route.params?.expenseId;//通过是否有参数,判断从哪里点击
    // console.log(editedExpenseId)
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense编辑' : 'Add Expense添加'
        })
    },[navigation, isEditing])

    const deleteExpenseHandler = async () => {
        // if (editedExpenseId) {//类型守卫
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId!)
            expensesCtx.deleteExpense(editedExpenseId!)
    
            navigation.goBack()//关闭模态

        } catch (error) {
            setError('网络不佳,暂时无法删除')
        }
        setIsSubmitting(false)

        // }
    }
    const cancelHandler = () => {
        navigation.goBack()//关闭模态

    }
    const confirmHandler = async (expenseData:Omit<Expense, 'id'>) => {
        setIsSubmitting(true)
        try {

            if (isEditing) {
                // expensesCtx.updateExpense(
                //     editedExpenseId,
                //     {
                //     description: 'Test!!!!',
                //     amount: 29.99,
                //     date: new Date('2026-01-17')
                // });
                expensesCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId,expenseData)
                // console.log(editedExpenseId)
    
            } else {
                // expensesCtx.addExpense({
                //     description: 'Test',
                //     amount: 19.99,
                //     date: new Date('2026-01-17'),
    
                // });
                // console.log('触发')
                const id =  await storeExpense(expenseData)//返回一个id
                expensesCtx.addExpense({...expenseData, id: id as Expense['id']})
            }
            navigation.goBack()//关闭模态
        } catch (error) {
            setError('暂时无法保存数据,请检查网络,稍后再试')
            setIsSubmitting(false)

            
        }


    }
    function errorHandler() {
        setError('')
    }
    if (error && !isSubmitting) {
        return <ErrorOverlay  message={error} onConfirm={errorHandler}/>
    }
    if (isSubmitting) {
        return <LoadingOverlay />
    }

  return (
    <View className='flex-1 p-6 bg-primary800'>
        <ExpenseForm 
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
        />
        {isEditing && (
        <View className='mt-4 pt-2 border-t-2 border-t-primary200 items-center'>

            <IconButton 
                name='trash'
                color={GlobalStyles.colors.error500}
                onPress={deleteExpenseHandler}/>
        </View>
        )}
      
    </View>
  )
}

export default ManageExpense
