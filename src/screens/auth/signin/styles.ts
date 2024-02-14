import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../../common/foundation';

export const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    color: Colors.forth,
    marginTop: Spacings.hSpace1,
  },
  subHeaderText: {
    textAlign: 'center',
    color: Colors.forth,
  },
  checkContainer: {
    alignItems: 'center',
    marginVertical: Spacings.hSpace10,
  },
  signupContainer: {
    justifyContent: 'center',
    marginVertical: Spacings.hSpace10,
  },
  margin: {
    marginVertical: Spacings.hSpace10,
  },
});
