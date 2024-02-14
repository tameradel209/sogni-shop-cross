import React, {forwardRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import {Colors, Spacings, Typography} from '../../common/foundation';
import {styles} from './styles';
import {ICodeVerification} from '../models';
import AuthView from '../../common/authView';
import Animated from 'react-native-reanimated';

const CodeVerification = (props: ICodeVerification, codeRef: any) => {
  const {
    loading,
    onVerify,
    code,
    onGoBack,
    onResendCode,
    header,
    subHeader,
    title,
    onChange,
    timerCount,
    titleValue,
    verifyTitle,
    goBackTitle,
    timerTitle,
    goBackButtonTitle,
    errorStyle,
    timerCountStyle,
  } = props;

  return (
    <AuthView>
      <View style={styles.container}>
        <Text style={[Typography.headerBold, styles.headerText]}>{header}</Text>
        <Text style={[Typography.header4, styles.subHeaderText]}>
          {subHeader}
        </Text>

        <View style={styles.centerContainer}>
          <View style={[styles.titleContainer, {flexDirection: 'row'}]}>
            <Text style={Typography.smallText}>{title} </Text>
            <Text style={[Typography.smallText, styles.titleValue]}>
              {titleValue}
            </Text>
          </View>
          <View style={styles.codeContainer}>
            {Array.from(Array(6).keys()).map((item, i) => (
              <CustomInput
                key={i}
                ref={ref => (codeRef.current[i] = ref)}
                circleCount={4}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                value={`${code[i]}`}
                onChangeText={(txt: string) => onChange(txt, i)}
                customStyle={styles.center}
                maxLength={1}
                textContentType="oneTimeCode"
                keyboardType="decimal-pad"
              />
            ))}
          </View>

          <View style={[styles.resendContainer, {flexDirection: 'row'}]}>
            <Pressable
              onPress={onResendCode}
              hitSlop={Spacings.hSpace10}
              style={styles.forgetButton}>
              <Text
                style={[
                  Typography.boldTinyText,
                  {textDecorationLine: 'underline'},
                  timerCountStyle,
                ]}>
                {timerTitle}
              </Text>
            </Pressable>
            <Text style={Typography.tinyText}>
              {' 00:'}
              {timerCount && timerCount < 10 ? '0' : null}
              {timerCount}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Animated.View style={[styles.margin, errorStyle]}>
            <CustomButton
              onPress={onVerify}
              circleCount={Spacings.smallCircleCount}
              loading={loading}
              title={verifyTitle}
              backgroundPressedInColor={Colors.secondary}
              backgroundPressedOutColor={Colors.third}
            />
          </Animated.View>

          <View style={[styles.resendContainer, {flexDirection: 'row'}]}>
            <Text style={Typography.tinyText}>{goBackTitle} </Text>
            <Pressable onPress={onGoBack} hitSlop={Spacings.hSpace10}>
              <Text
                style={[
                  Typography.boldTinyText,
                  {textDecorationLine: 'underline'},
                ]}>
                {goBackButtonTitle}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </AuthView>
  );
};

export default forwardRef(CodeVerification);
