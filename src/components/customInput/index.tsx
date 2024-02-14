import React, {forwardRef, LegacyRef, useState} from 'react';
import {View, TextInput, TextInputProps, Text} from 'react-native';
import {Colors, Sizing, Spacings, Typography} from '../../common/foundation';
import Zigzag from '../../common/zigzag';
import {ICustomInputProps} from '../models';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
const CustomInput = (
  props: TextInputProps & ICustomInputProps,
  ref: LegacyRef<TextInput>,
) => {
  const {
    circleCount,
    backgroundColor,
    color,
    blurColor,
    focusColor,
    rightIcon,
    leftIcon,
    customStyle,
    circleSize,
    shring,
    errorMessage,
  } = props;
  const {i18n} = useTranslation();
  const [focused, setFocused] = useState(false);
  return (
    <>
      <View
        style={[
          {
            height:
              (circleSize ?? Spacings.circleSmallSize) * 2 - (shring ?? 0),
            width: (circleSize ?? Spacings.circleSmallSize) * circleCount * 0.5,
            flexDirection: 'row',
          },
        ]}>
        <Zigzag
          circleCount={circleCount}
          circleSize={circleSize ?? Spacings.circleSmallSize}
          color={
            backgroundColor
              ? backgroundColor
              : focused
              ? focusColor || Colors.primary
              : blurColor || Colors.secondary
          }
          shring={shring}
        />
        {
          <View
            style={[
              styles.rightIconContainer,
              {
                left: (circleSize ?? Spacings.circleSmallSize) * 0.5,
              },
            ]}>
            {leftIcon ? leftIcon(focused) : null}
          </View>
        }
        {errorMessage ? (
          <View
            style={[
              styles.rightIconContainer,
              {
                left: (circleSize ?? Spacings.circleSmallSize) * 0.5,
              },
            ]}>
            <AntDesign
              name="exclamationcircle"
              size={Sizing.smallIcon}
              color={Colors.denger}
            />
          </View>
        ) : null}

        <TextInput
          {...props}
          ref={ref}
          placeholderTextColor={
            color
              ? color
              : focused
              ? blurColor || Colors.secondary
              : focusColor || Colors.primary
          }
          hitSlop={(circleSize ?? Spacings.circleSmallSize) * 0.5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.pressable,
            {
              backgroundColor: 'transparent',
              flex: 1,
              height:
                (circleSize || Spacings.circleSmallSize) * 2 - (shring || 0),
              // width: rightIcon
              //   ? (circleSize ?? Spacings.circleSmallSize) * (circleCount * 0.5) -
              //     Sizing.smallIcon
              //   : (circleSize ?? Spacings.circleSmallSize) * (circleCount * 0.5),
              color: color
                ? color
                : focused
                ? blurColor || Colors.secondary
                : focusColor || Colors.primary,
              fontSize: Spacings.hSpace8 * 0.65 - (shring ? shring / 2 : 0),
              paddingHorizontal: Spacings.hSpace9,
              textAlign: i18n.language == 'ar' ? 'right' : 'left',
            },
            customStyle,
          ]}
        />
        <View
          style={[
            styles.rightIconContainer,
            {
              right: (circleSize ?? Spacings.circleSmallSize) * 0.5,
            },
          ]}>
          {rightIcon ? rightIcon(focused) : null}
        </View>
      </View>
      {errorMessage ? (
        <Text style={[Typography.error]}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

export default forwardRef(CustomInput);
