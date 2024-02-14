import {ViewStyle} from 'react-native';

export interface IZigzagProps {
  circleCount: number;
  color?: string;
  borderColor?: string | null;
  circleSize: number;
  stylesPassed?: ViewStyle;
  shring?: number;
  direction?: 'horizontal' | 'vertical';
}
export interface IZigzagSquareShape {
  horizontalCount: number;
  verticalCount: number;
  color?: string;
  circleSize?: number;
}
