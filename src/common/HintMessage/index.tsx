import React, {useEffect, useRef, useState} from 'react';
import {Text, StatusBar, Platform, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {Spacings, Colors, Typography, Sizing} from '../../common/foundation';
import ZigzagSquareShape from '../../common/zigzagSquareShape';
import {hideHintMessage} from '../../redux/slices/hintMessage';
import {RootState} from '../../redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {ERROR, SUCCESS, MESSAGE, GOTOMESSAGES} from '../../redux/constants';
import {useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList} from '../../navigation/bottom/types';
const HintMessage = () => {
  const {showHint, title, body, type, onPress} = useSelector(
    (state: RootState) => state.hintReducer,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<BottomTabScreenProps<BottomTabsParamList>>();
  const horizontalCount = Spacings.smallCircleCount * 0.5 + 1;
  const verticalCount = 3;
  const top = Platform.OS == 'android' ? StatusBar.currentHeight ?? 20 : 20;
  const translateY = useSharedValue(-Spacings.hSpace1);
  useEffect(() => {
    if (showHint) {
      setTimeout(
        () => (translateY.value = withTiming(top, {duration: 1000})),
        1000,
      );
      setTimeout(() => {
        dispatch(hideHintMessage());
      }, 10000);
    } else {
      translateY.value = withTiming(-Spacings.hSpace1, {duration: 1000});
    }
  }, [showHint]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  }, []);

  type contextType = {
    translateY: number;
  };
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextType
  >({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      if (event.translationY + context.translateY < Spacings.hSpace4) {
        translateY.value = event.translationY + context.translateY;
      }
    },
    onEnd: () => {
      translateY.value = withTiming(-Spacings.hSpace1, {duration: 1000});
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          {
            alignSelf: 'center',
            position: 'absolute',
            width: horizontalCount * Spacings.circleSmallSize,
            height: Spacings.circleSmallSize * verticalCount,
          },
          reanimatedStyle,
        ]}>
        <TouchableWithoutFeedback
          onPress={() =>
            onPress == GOTOMESSAGES ? navigation.navigate('Chat') : null
          }>
          <View
            style={[
              {
                width: horizontalCount * Spacings.circleSmallSize,
                height: Spacings.circleSmallSize * verticalCount,
              },
            ]}>
            <ZigzagSquareShape
              horizontalCount={horizontalCount}
              verticalCount={verticalCount}
              circleSize={Spacings.circleSmallSize}
              color={
                type == ERROR
                  ? Colors.denger
                  : type == SUCCESS
                  ? Colors.success
                  : type == MESSAGE
                  ? Colors.secondary
                  : Colors.secondary
              }
            />
            <Ionicons
              name="close"
              size={Sizing.icon}
              color={Colors.white}
              onPress={() => {
                dispatch(hideHintMessage());
              }}
            />
            <Text
              style={[
                Typography.header7,
                {color: Colors.white, paddingHorizontal: Spacings.wSpace7},
              ]}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                Typography.boldTinyText,
                {
                  color: Colors.forth,
                  paddingHorizontal: Spacings.wSpace7,
                },
              ]}>
              {body}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default HintMessage;
