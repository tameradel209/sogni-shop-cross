import React, {useState} from 'react';
import {Text, View, Pressable, ActivityIndicator} from 'react-native';
import {Colors, Spacings, Typography} from '../../common/foundation';
import Zigzag from '../../common/zigzag';
import CustomActivityIndicator from '../activityIndication';
import {ICustomButtonProps} from '../models';
import {styles} from './styles';

const CustomButton = (props: ICustomButtonProps) => {
  const {
    title,
    titleStyle,
    onPress,
    circleCount,
    backgroundColor,
    backgroundPressedInColor,
    backgroundPressedOutColor,
    color,
    loading,
    circleSize,
    shring,
  } = props;
  const [pressed, setPressed] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {width: (circleSize ?? Spacings.circleSmallSize) * circleCount * 0.5},
      ]}>
      <Zigzag
        circleCount={circleCount}
        circleSize={circleSize ?? Spacings.circleSmallSize}
        color={
          backgroundColor
            ? backgroundColor
            : pressed
            ? backgroundPressedInColor
            : backgroundPressedOutColor
        }
        shring={shring}
      />
      <View>
        <Pressable
          disabled={loading}
          hitSlop={(circleSize ?? Spacings.circleSmallSize) * 0.5}
          onPress={onPress}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={({pressed}) => [
            styles.pressable,
            {
              width:
                (circleSize ?? Spacings.circleSmallSize) *
                (circleCount * 0.5 - 1),
              height: (circleSize ?? Spacings.circleSmallSize) * 1.5,
              backgroundColor: backgroundColor
                ? backgroundColor
                : pressed
                ? backgroundPressedInColor || Colors.secondary
                : backgroundPressedOutColor || Colors.primary,
            },
          ]}>
          {loading ? (
            <CustomActivityIndicator color={Colors.forth} />
          ) : (
            <Text
              adjustsFontSizeToFit
              style={[
                {
                  color: color
                    ? color
                    : pressed
                    ? backgroundPressedOutColor || Colors.primary
                    : backgroundPressedInColor || Colors.secondary,
                  fontSize: (circleSize ?? Spacings.circleSmallSize) * 0.6,
                },
                titleStyle,
              ]}>
              {title}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default CustomButton;
