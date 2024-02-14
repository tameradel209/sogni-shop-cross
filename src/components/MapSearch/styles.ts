import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';
import {height} from '../../config/helpers/thresholds';

export default StyleSheet.create({
  main: {
    height: Spacings.circleSmallSize * 2,
    width: Spacings.circleSmallSize * Spacings.smallCircleCount * 0.5,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    height: height * 0.42,
  },
  description: {
    color: Colors.primary,
  },
  listView: {
    backgroundColor: Colors.forth,
  },
  row: {
    backgroundColor: 'transparent',
  },
  poweredContainer: {
    backgroundColor: 'transparent',
  },
  predefinedPlacesDescription: {
    color: Colors.white,
  },
  textInputContainer: {
    height: Spacings.circleSmallSize * 2,
    color: Colors.forth,
  },
  textInput: {
    height: Spacings.circleSmallSize * 2,
    fontSize: Spacings.wSpace7,
    backgroundColor: 'transparent',
    paddingHorizontal: Spacings.wSpace6,
  },
  separator: {
    height: 0,
  },
});
