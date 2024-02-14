import React, {useEffect} from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Sizing} from '../../common/foundation';
import {IActivityIndicator} from '../models';
import styles from './styles';

const CustomActivityIndicator = (props: IActivityIndicator) => {
  const {size, color} = props;
  const animation = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: animation.value + 'deg',
        },
      ],
    };
  });
  const startAnimation = () => {
    animation.value = withRepeat(
      withSequence(
        withTiming(360, {duration: 1000, easing: Easing.linear}),
        withTiming(0, {duration: 1000, easing: Easing.linear}),
      ),
      -1,
      false,
    );
  };
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[animationStyle]}>
        <MaterialCommunityIcons
          name={'decagram-outline'}
          color={color ?? Colors.third}
          size={size ?? Sizing.bigIcon * 0.9}
        />
      </Animated.View>
    </View>
  );
};

export default CustomActivityIndicator;
