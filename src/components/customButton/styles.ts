import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';

export const styles = StyleSheet.create({
  container: {
    height: Spacings.circleSmallSize * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
});
