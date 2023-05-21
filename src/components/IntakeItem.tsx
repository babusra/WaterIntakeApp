import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from '../constant/Dimension'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props{
    onLongPress:Function
    item:{
        amount: number | string,
        unit:string
    }
}

const IntakeItem = (props:Props) => {
  return (
    <TouchableOpacity
    style={{
      height: moderateScale(50),
      borderRadius: 8,
      marginVertical: moderateScale(5),
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 30,
      borderWidth:0.2,
      borderColor:'grey',
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      flexDirection:'row'
    }}
    onLongPress={() => props.onLongPress && props.onLongPress(props.item)}>
    <Text style={{fontSize:17,color:'#67666E'}}>
      {props.item.amount} <Text>{props.item.unit}</Text>
    </Text>
    <Icon style={{position:'absolute',right:moderateScale(20)}} color={'#4488FF'} size={20} name={'cup'}/>
  </TouchableOpacity>
  )
}

export default IntakeItem