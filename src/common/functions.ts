import {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import {Alert} from 'react-native'
import {emailReg, passwordReg} from './keys';
import NetInfo from "@react-native-community/netinfo";

export const ErrorAnimation = translateX => {
  translateX.value = withSequence(
    withTiming(-1, {duration: 50}),
    withRepeat(withTiming(1, {duration: 100}), 6, true),
    withTiming(0, {duration: 50}),
  );
};

export const passwordValidation = (
  password: string,
  setPassword: (text: string) => void,
  setPasswordError: (text: string | null) => void,
  text?: string,
) => {
  let test;
  if (text != null) {
    setPassword(text);
    test = text;
  } else {
    test = password;
  }
  if (passwordReg[0].test(test)) {
    setPasswordError('password is required');
  } else if (!passwordReg[1].test(test)) {
    setPasswordError('password must be 8 characters at least');
  } else if (!passwordReg[2].test(test)) {
    setPasswordError('password must contains 1 upper letter at least');
  } else if (!passwordReg[3].test(test)) {
    setPasswordError('password must contains 1 lower letter at least');
  } else if (!passwordReg[4].test(test)) {
    setPasswordError('password must contains 1 number at least');
  } else if (!passwordReg[5].test(test)) {
    setPasswordError('password must contains 1 special character at least');
  } else {
    setPasswordError(null);
    return true;
  }
  return false;
};

export const userNameValidation = (
  username: string,
  setUserName: (text: string) => void,
  setUserNameError: (text: string | null) => void,
  text?: string,
) => {
  let test;
  if (text != null) {
    setUserName(text);
    test = text;
  } else {
    test = username;
  }
  if (passwordReg[0].test(test)) {
    setUserNameError('email is required');
  } else if (!emailReg.test(test)) {
    setUserNameError('you entered invalid email');
  } else {
    setUserNameError(null);
    return true;
  }
  return false;
};

export const existValidation = (
  value: string,
  setValue: (text: string) => void,
  setValueError: (text: string | null) => void,
  valueName: string,
  text?: string,
) => {
  let test;
  if (text != null) {
    setValue(text);
    test = text;
  } else {
    test = value;
  }
  if (passwordReg[0].test(test)) {
    setValueError(valueName + ' is required');
  } else {
    setValueError(null);
    return true;
  }
  return false;
};

export const testConnection = NetInfo.addEventListener(state => state.isConnected?null: Alert.alert('Connection Error', 'You Are Not Connected To The Internet'))