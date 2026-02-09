import { View, Text, TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { GlobalStyles } from 'constants/styles';



const Input = ({ label, invalid, style, textInputConfig }: { label: ReactNode, style?: StyleProp<TextStyle>, textInputConfig?: TextInputProps, invalid: boolean }) => {
    // 初始化为空元组（符合 [InputStyleItem?] 类型）
    const inputStyles = []
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={style} className='mx-1 my-2'>
            <Text className={`text-[12px]  mb-1 ${invalid ? 'color-error500' : 'color-primary100'}`}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} className='bg-primary100 color-primary700 p-2 rounded-md text-[18px]' />
        </View>
    )
}

const styles = StyleSheet.create({
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'

    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }


})

export default Input