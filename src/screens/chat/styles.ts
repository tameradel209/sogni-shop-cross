import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  goBottomView: {
    position: 'absolute',
    bottom: Spacings.hSpace,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
