import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import { Expense } from 'components/type'
import Button from 'components/UI/Button'
import { getFormattedDate } from 'util/date'

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }: { onCancel?: () => void, submitHandler?: () => void, onSubmit?: (expenseData: Omit<Expense, 'id'>) => void, submitButtonLabel?: string, defaultValues: Expense | undefined }) => {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,

        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,

        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        }
    })

    const inputChangedHandler = (inputIdentifier: string, enteredValue?: string) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }//inputIdentifier是动态属性名
            }
        });
    }
    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value.trim()
        }
        //验证用户输入
        // 解决：更严谨的校验（推荐用 Number.isNaN 或类型+值双重判断）
        const strictIsNumber = (value: any) => {
            return typeof value === 'number' && !isNaN(value);
        };
        //3个助手常量
        const amountIsValid = strictIsNumber(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert('无效输入', '请检查输入,或描述为空')
            setInputs((curInputs) => {
                return {
                    amount: {
                        value: curInputs.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: curInputs.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    }
                }
            })
            return;

        }

        onSubmit!(expenseData)

    }
    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View className='mt-10'>
            <Text className='text-[18px] font-bold text-white mx-6 text-center'>你的支出</Text>
            <View className='flex-row justify-between'>
                <Input
                    style={{ flex: 1 }}
                    label="花费"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} />
                <Input
                    style={{ flex: 1 }}
                    label="日期"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }} />
            </View>
            <Input
                label="描述"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }} />
            {formIsInvalid && (<Text className='text-center text-error500 m-2'>无效输入,请检查输入 </Text>)}
            <View className='flex-row justify-center items-center'>
                <Button style={{ minWidth: 120, marginHorizontal: 8 }} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={{ minWidth: 120, marginHorizontal: 8 }} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm