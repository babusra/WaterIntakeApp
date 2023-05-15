import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const Navigation = () => {
    
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


  const MainStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        </Stack.Navigator>
    )
  };



  return(
    <NavigationContainer>
        <MainStack/>
    </NavigationContainer>
  )
};

export default Navigation;
