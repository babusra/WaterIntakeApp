import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {moderateScale} from '../constant/Dimension';
import {Intake} from '../models/IntakeModel';
import IntakeItem from './IntakeItem';

interface Props {
  data: Intake[];
  onLongPress: Function;
}
const IntakeList = (props: Props) => {
  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <View>
          <ActivityIndicator />
        </View>
      }
      renderItem={({item, index}) => {
        return (
          <IntakeItem
            onLongPress={() => props.onLongPress && props.onLongPress(item)}
            item={item}
          />
        );
      }}
    />
  );
};

export default IntakeList;
