import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import {moderateScale} from '../constant/Dimension';

interface Props {
  navigation?: any;
}

const GoalScreen = (props: Props) => {
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'flex-start'}}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Icon size={35} name={'chevron-left'} />
      </TouchableOpacity>
      <Progress.Circle
        style={{alignSelf: 'center'}}
        progress={progress / 100}
        size={300}
        borderWidth={5}
        borderColor={'#00C9FF'}
        color={'#00C9FF'}
        thickness={30}
        showsText
        formatText={() => {
          return (
            <View>
              <Text style={{fontSize: 40}}>%{progress}</Text>
            </View>
          );
        }}
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
        <TextInput
          style={{
            borderWidth: 1,
            width: moderateScale(200),
            height: moderateScale(40),
            borderRadius: 4,
            borderColor: '#020202',
            padding: moderateScale(7),
          }}
          placeholder={'Hedef girin..'}
        />
      </View>

      <TouchableOpacity
        style={{alignSelf: 'center', margin: moderateScale(20)}}>
        <Icon size={55} name={'plus-circle'} />
      </TouchableOpacity>
      <Text style={{borderWidth:1,padding:moderateScale(8),borderRadius:7}}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </Text>
    </View>
  );
};

export default GoalScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: moderateScale(60),
    paddingHorizontal: moderateScale(15),
  },
});
