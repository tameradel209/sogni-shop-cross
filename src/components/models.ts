import {ReactNode} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
export interface ICustomButtonProps {
  title: string;
  titleStyle?: TextStyle;
  onPress: () => void;
  circleCount: number;
  backgroundColor?: string;
  backgroundPressedInColor?: string;
  backgroundPressedOutColor?: string;
  color?: string;
  loading?: boolean;
  borderColor?: boolean;
  circleSize?: number;
  shring?: number;
}

export interface ICustomInputProps {
  circleCount: number;
  backgroundColor?: string;
  color?: string;
  blurColor?: string;
  focusColor?: string;
  rightIcon?: (focused: boolean) => ReactNode;
  leftIcon?: (focused: boolean) => ReactNode;
  customStyle?: {};
  circleSize?: number;
  shring?: number;
  errorMessage?: string | null;
  height?: number | null;
  children?: ReactNode;
}

export interface ICodeVerification {
  header?: string;
  subHeader?: string;
  title?: string;
  loading?: boolean;
  onResendCode: () => void;
  onVerify: CallableFunction;
  onGoBack: () => void;
  code: string[];
  onChange: CallableFunction;
  timerCount?: number;
  titleValue?: string;
  verifyTitle: string;
  goBackTitle: string;
  timerTitle: string;
  goBackButtonTitle: string;
  errorStyle: ViewStyle;
  timerCountStyle: TextStyle;
}

export interface IActivityIndicator {
  size?: number;
  color?: string;
}
