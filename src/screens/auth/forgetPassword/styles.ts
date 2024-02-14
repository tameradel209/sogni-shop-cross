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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Spacings.hSpace10,
  },
  margin: {
    marginVertical: Spacings.hSpace10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flex: 3,
    marginBottom: Spacings.hSpace3,
    justifyContent: 'flex-end',
  },
});
