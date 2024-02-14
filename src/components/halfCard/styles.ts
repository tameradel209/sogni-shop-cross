import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: Spacings.wSpace6,
  },
  count: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
