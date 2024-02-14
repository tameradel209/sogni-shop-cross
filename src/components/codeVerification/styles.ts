import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';
import {height, width} from '../../config/helpers/thresholds';

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
    color: Colors.forth,

    textAlign: 'center',
  },
  margin: {
    marginBottom: Spacings.hSpace10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacings.hSpace10,
  },
  titleContainer: {
    marginBottom: Spacings.hSpace10,
  },
  titleValue: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  center: {
    textAlign: 'center',
  },
  resendContainer: {
    justifyContent: 'flex-end',
  },
  forgetButton: {
    alignSelf: 'flex-end',
  },
  bottomContainer: {
    flex: 2,
    marginBottom: Spacings.hSpace3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
