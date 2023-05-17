import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native';
import {moderateScale} from '../constant/Dimension';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  navigation?: any;
}

const HomeScreen = (props: Props) => {
  const data = [
    {
      createdAt: '2023-05-11T12:36:30.992Z',
      amount: 250,
      unit: 'ml',
      id: '1',
    },
    {
      createdAt: '2023-05-11T01:21:14.653Z',
      amount: 250,
      unit: 'ml',
      id: '2',
    },
    {
      createdAt: '2023-05-10T20:03:03.137Z',
      amount: 250,
      unit: 'ml',
      id: '3',
    },
    {
      createdAt: '2023-05-10T21:16:42.702Z',
      amount: 250,
      unit: 'ml',
      id: '4',
    },
    {
      createdAt: '2023-05-10T15:07:20.731Z',
      amount: 250,
      unit: 'ml',
      id: '5',
    },
    {
      createdAt: '2023-05-10T20:26:30.627Z',
      amount: 250,
      unit: 'ml',
      id: '6',
    },
  ];
  const [progress,setProgress] = useState(30)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => {
          props.navigation.navigate('GoalScreen');
        }}>
        <Icon size={40} name={'menu'} />
      </TouchableOpacity>
      <Progress.Circle
        style={{alignSelf: 'center'}}
        progress={progress/100}
        size={300}
        color="red"
        showsText
        formatText={() => <Text>{progress}</Text>}
        allowFontScaling
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: moderateScale(20),
          paddingTop: moderateScale(20),
          borderTopWidth: 2,
        }}>
        <TouchableOpacity>
          <Icon name={'umbrella'} size={30} />
          <Text>Günlük</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'umbrella'} size={30} />
          <Text>Haftalık</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'umbrella'} size={30} />
          <Text>Aylık</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{alignSelf: 'center', margin: moderateScale(20)}}>
        <Icon size={55} name={'plus-circle'} />
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                height: moderateScale(40),
                borderWidth: 1,
                borderRadius: 8,
                marginVertical: moderateScale(5),
                justifyContent: 'center',
              }}>
              <Text>
                {item.amount} <Text>{item.unit}</Text>
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: moderateScale(40),
    paddingHorizontal: moderateScale(15),
  },
});
