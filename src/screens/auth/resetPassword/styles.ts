import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../../common/foundation';
import {height, width} from '../../../config/helpers/thresholds';

export const styles = StyleSheet.create({
  container: {
    height,
  },
  headerText: {
    textAlign: 'center',
    color: Colors.forth,
    marginTop: Spacings.hSpace1,
  },
  subHeaderText: {
    textAlign: 'center',
    color: Colors.forth,
  },
  margin: {
    marginVertical: Spacings.hSpace10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flex: 1,
    marginBottom: Spacings.hSpace3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
