import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';
import {height, width} from '../../config/helpers/thresholds';

const styles = StyleSheet.create({
  searchView: {
    alignItems: 'center',
    position: 'absolute',
    width,
    top: Spacings.hSpace3,
  },
  loadingView: {
    height,
    width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.loadingBack,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width,
    height,
  },
});

export default styles;
