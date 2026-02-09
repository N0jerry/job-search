import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { Meal } from 'types/navigation';


interface MealDetailsProps extends Meal {
  className?: string; // 设为可选属性更灵活
  textStyle?: StyleProp<TextStyle>;

}


const MealDetails = ({duration,complexity,affordability,className,textStyle}:MealDetailsProps) => {
    
  return (
     <View  className={`flex-row items-center p-2 justify-center ${className}`}>
        <Text style={[textStyle]} className='mx-1 p-2'>{duration}m</Text>
        <Text style={[textStyle]} className='mx-1 p-2'>{complexity.toUpperCase()}</Text>
        <Text style={[textStyle]} className='mx-1 p-2'>{affordability.toUpperCase()}</Text>
    </View>
  )
}

export default MealDetails