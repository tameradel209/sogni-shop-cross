import React from 'react';
import {View} from 'react-native';
import {IZigzagProps} from '../models';
import {styles} from './styles';

const Zigzag = (props: IZigzagProps) => {
  const {
    circleCount,
    color,
    borderColor,
    circleSize,
    stylesPassed,
    shring,
    direction,
  } = props;
  const isVertical = direction
    ? direction == 'horizontal'
      ? false
      : true
    : false;
  return (
    <View
      style={[
        styles.circleContainer,
        {
          width: isVertical
            ? circleSize * 2 - (shring ?? 0)
            : circleSize * circleCount * 0.5,
        },
        stylesPassed,
      ]}>
      <View
        style={[
          styles.backContainer,
          {
            width: isVertical
              ? circleSize * 2 - (shring ?? 0)
              : circleSize * circleCount * 0.5,
            height: isVertical
              ? circleSize * circleCount * 0.5
              : circleSize * 2 - (shring ?? 0),
          },
        ]}>
        <View
          style={{
            width: isVertical
              ? circleSize * 1.6 - (shring ?? 0)
              : circleSize * (circleCount * 0.5 - 1),
            height: isVertical
              ? circleSize * (circleCount * 0.5 - 1)
              : circleSize * 1.6 - (shring ?? 0),
            borderColor: borderColor ?? 'transparent',
            borderWidth: borderColor ? 1 : 0,
          }}
        />
      </View>
      <View style={isVertical ? {} : styles.row}>
        {Array.from(Array(circleCount / 2).keys()).map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: color,
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize,
              borderColor: borderColor ?? 'transparent',
              borderWidth: borderColor ? 1 : 0,
            }}
          />
        ))}
      </View>
      <View style={isVertical ? {} : styles.row}>
        {Array.from(Array(circleCount / 2).keys()).map((item, index) => (
          <View
            key={index}
            style={[
              {
                backgroundColor: color,
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize,
                borderColor: borderColor ?? 'transparent',
                borderWidth: borderColor ? 1 : 0,
              },
              isVertical ? {right: shring ?? 0} : {top: -(shring ?? 0)},
            ]}
          />
        ))}
      </View>
      <View
        style={[
          styles.backContainer,
          {
            width: isVertical
              ? circleSize * 2 - (shring ?? 0)
              : circleSize * circleCount * 0.5,
            height: isVertical
              ? circleSize * circleCount * 0.5
              : circleSize * 2 - (shring ?? 0),
          },
        ]}>
        <View
          style={{
            backgroundColor: color,
            width: isVertical
              ? circleSize * 1.6 - (shring ?? 0)
              : circleSize * (circleCount * 0.5 - 1),
            height:
              (isVertical
                ? circleSize * (circleCount * 0.5 - 1)
                : circleSize * 1.6 - (shring ?? 0)) - 2,
          }}
        />
      </View>
    </View>
  );
};

export default Zigzag;
