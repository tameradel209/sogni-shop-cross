import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Spacings, Typography} from '../../common/foundation';
import IMAGES from '../../common/images';
import {styles} from './styles';
import ZigzagSquareShape from '../../common/zigzagSquareShape';
import CustomButton from '../customButton';

const ThirdCard = (props: any) => {
  const horizontalCount = Spacings.smallCircleCount * 0.25 - 2;
  const verticalCount = Spacings.smallCircleCount * 0.25 - 1;
  const circleSize = Spacings.circleTinySize;
  const {style, name, onPress} = props;
  const [count, setCount] = useState(0);

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: circleSize * 0.5,
          width: horizontalCount * circleSize,
          height: circleSize * verticalCount,
        }}>
        <ZigzagSquareShape
          horizontalCount={horizontalCount}
          verticalCount={verticalCount}
          circleSize={circleSize}
        />
        <Image
          source={IMAGES.product1}
          resizeMode="contain"
          style={{
            width: horizontalCount * circleSize * 0.7,
            height: horizontalCount * circleSize * 0.7,
            alignSelf: 'center',
          }}
        />
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          style={Typography.headerBold8}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThirdCard;
