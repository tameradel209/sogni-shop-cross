import {StyleSheet} from 'react-native';
import {height, width} from '../../config/helpers/thresholds';
import {Colors, Spacings} from '../foundation';

export const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal:
      (Spacings.circleSmallSize + Spacings.smallRemainingWidth) / 2,
  },
  overlay: {
    position: 'absolute',
    width,
    height,
    bottom: 0,
    opacity: 0.5,
  },
});
