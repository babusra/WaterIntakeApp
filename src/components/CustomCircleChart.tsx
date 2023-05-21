import {View, Text} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { moderateScale } from '../constant/Dimension';

interface Props {
  progress: any;
  formatText: Function;
}

const CustomCircleChart = (props: Props) => {
  const {progress, formatText} = props;
  return (
    <Progress.Circle
      style={{alignSelf: 'center'}}
      progress={progress/100}
      size={moderateScale(300)}
      borderWidth={3}
      borderColor={'#4488FF'}
      color={'#4488FF'}
      thickness={30}
      showsText
      formatText={() => formatText && formatText()}
      allowFontScaling
    />
  );
};

export default CustomCircleChart;
